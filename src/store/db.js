import firebase from "firebase/app"
import "firebase/firestore"

export const fetchUserState = async user => {
  const doc = await firebase.firestore().collection("users").doc(user.uid).get()

  if (doc.exists) {
    return doc.data()
  } else {
    return null
  }
}

export const uploadUserState = user => async (_, getState) => {
  const {
    tasks: { tasks },
    sessions: { configuration },
    progress,
  } = getState()

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
      progress,
    })
}
