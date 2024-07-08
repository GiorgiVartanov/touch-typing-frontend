import ajax from "./ajax"

// save keyboard on a server
export const saveAssessment = (percentage: number, assessmentLevel: number, token: string) => {
  return ajax.post(
    "/lesson/assessment",
    { assessmentLevel: assessmentLevel, percentage: percentage },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}
