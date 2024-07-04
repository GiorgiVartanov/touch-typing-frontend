import ajax from "./ajax"

// save keyboard on a server
export const saveAssessment = (percentage: number, assessmentLevel: string, token: string) => {
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
