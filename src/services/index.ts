import { fetchData } from "../utils/fetchData";

export async function fetchUsers() {
  return fetchData("users");
}

export async function fetchUserAlbums(userId: string) {
  return fetchData(`users/${userId}/albums`);
}

export async function fetchAlbumPhotos(userId: string) {
  return fetchData(`albums/${userId}/photos`);
}

export async function fetchUserPosts(userId: string) {
  return fetchData(`users/${userId}/posts`);
}

export async function fetchPostComments(postId: string) {
  return fetchData(`posts/${postId}/comments`);
}
