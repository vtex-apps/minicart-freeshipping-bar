import axios from 'axios'

export const getSessionChannel = async () => {
  const sessionRoute = '/api/sessions?items=*'

  try {
    const {
      data: {
        namespaces: {
          store: {
            channel: { value: sc },
          },
        },
      },
    } = await axios.get(sessionRoute)

    return sc
  } catch (error) {
    throw error
  }
}
