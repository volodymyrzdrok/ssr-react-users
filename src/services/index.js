import { fetchData } from "../utils/fetchData";

export async function fetchUsers() {
  return fetchData("users");
}
export async function fetchUserAlbums(userId) {
  return fetchData(`users/${userId}/albums`);
}

export async function fetchAlbumPhotos(userId) {
  return fetchData(`albums/${userId}/photos`);
}
export async function fetchUserPosts(userId) {
  return fetchData(`users/${userId}/posts`);
}

export async function fetchPostComments(userId) {
  return fetchData(`posts/${userId}/comments`);
}
