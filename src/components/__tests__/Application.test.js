import React from "react"
import axios from "axios"

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByTestId,
  prettyDOM,
  getByText,
  getAllByTestId,
  queryByText,
  getByAltText,
  getByPlaceholderText
} from "@testing-library/react"

import Application from "components/Application"

afterEach(cleanup)

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />)

    await waitForElement(() => getByText("Monday"))
    fireEvent.click(getByText("Tuesday"))

    expect(getByText("Leopold Silvers")).toBeInTheDocument()
  })
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />)

    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment")[0]

    fireEvent.click(getByAltText(appointment, "Add"))

    const input = getByPlaceholderText(appointment, "Enter Student Name")

    fireEvent.change(input, { target: { value: "Nikita" } })

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))

    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "Saving")).toBeInTheDocument()
    await waitForElement(() => queryByText(appointment, "Nikita"))
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    )
    expect(getByText(day, "no spots remaining")).toBeInTheDocument()
  })
  it("loads data, delete an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />)
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointment = getAllByTestId(container, "appointment")[1]
    fireEvent.click(getByAltText(appointment, "Delete"))
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument()
    fireEvent.click(getByText(appointment, "Confirm"))
    await waitForElement(() => getByAltText(appointment, "Add"))
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    )
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument()
  })
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />)
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointment = getAllByTestId(container, "appointment")[1]
    fireEvent.click(getByAltText(appointment, "Edit"))
    expect(getByTestId(appointment, "student-name-input")).toHaveValue(
      "Archie Cohen"
    )

    const input = getByPlaceholderText(appointment, "Enter Student Name")

    fireEvent.change(input, { target: { value: "Nikita S" } })

    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "Saving")).toBeInTheDocument()

    await waitForElement(() => queryByText(appointment, "Nikita S"))
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    )
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument()
  })

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce()
    const { container, debug } = render(<Application />)

    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment")[0]

    fireEvent.click(getByAltText(appointment, "Add"))

    const input = getByPlaceholderText(appointment, "Enter Student Name")

    fireEvent.change(input, { target: { value: "Nikita" } })

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))

    fireEvent.click(getByText(appointment, "Save"))

    expect(getByText(appointment, "Saving")).toBeInTheDocument()

    await waitForElement(() => queryByText(appointment, "Error"))

    fireEvent.click(getByAltText(appointment, "Close"))

    expect(getByText(appointment, "Save")).toBeInTheDocument()
  })

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce()

    const { container, debug } = render(<Application />)

    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment")[1]

    fireEvent.click(getByAltText(appointment, "Delete"))

    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument()

    fireEvent.click(getByText(appointment, "Confirm"))

    expect(getByText(appointment, "Deleting")).toBeInTheDocument()

    await waitForElement(() => getByAltText(appointment, "Close"))

    fireEvent.click(getByAltText(appointment, "Close"))

    expect(getByAltText(appointment, "Edit")).toBeInTheDocument()
  })
})
