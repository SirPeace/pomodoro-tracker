import firebase from "firebase/app"
import "firebase/firestore"

export const fetchUserState = async user => {
  const doc = await firebase.firestore().collection("users").doc(user.uid).get()

  return doc.exists ? doc.data() : null
}

export const uploadUserState = () => async (_, getState) => {
  const {
    auth: { user },
    tasks: { tasks },
    sessions: { configuration },
    progress,
  } = getState()

  if (user) {
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set({
        tasks: tasks.map(task => ({
          ...task,
          createdAt: new Date(task.createdAt).getTime(),
          updatedAt: new Date(task.updatedAt).getTime(),
          dueTo: task.dueTo ? new Date(task.dueTo).getTime() : null,
        })),
        configuration,
        progress: {
          ...progress,
          todayChart: JSON.stringify(progress.todayChart),
          weekChart: JSON.stringify(progress.weekChart),
          yearChart: JSON.stringify(progress.yearChart),
          lastUpdate: Date.now(),
        },
      })
  }
}
