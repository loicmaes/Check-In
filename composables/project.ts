import {useState, useRequestHeaders, navigateTo} from "#imports";
import type {IProject, IProjectCreateBody, IRichProject} from "~/types/project";
import type {ISession} from "~/types/session";

export async function useProjects (): Promise<IProject[]> {
  const projects = useState<IProject[]>("projects", () => []);

  const { data } = await useFetch("/api/project/recoverAll", {
    headers: useRequestHeaders(["cookie"])
  });
  if (data.value) projects.value = data.value;

  return projects.value;
}
export async function useRichProject (projectUid: string): Promise<IRichProject | null> {
  const { data } = await useFetch<IRichProject>(`/api/project/${projectUid}/recover`, {
    headers: useRequestHeaders(["cookie"])
  });
  return data.value;
}
export async function useDraftSessions (): Promise<ISession[]> {
  const { data } = await useFetch<ISession[]>("/api/project/draft/recover", {
    headers: useRequestHeaders(["cookie"])
  });
  return data.value ?? [];
}
export async function createProject (body: IProjectCreateBody) {
  try {
    const project = await $fetch<IProject>("/api/project/create", {
      headers: useRequestHeaders(["cookie"]),
      method: "POST",
      body
    });
    useState<IProject[]>("projects").value.push(project);
    navigateTo(`/app/project/${project.uid}`);
  } catch (e) {
    // TODO: toast.
  }
}
export async function deleteProject (projectUid: string) {
  const projects = useState<IProject[]>("projects");

  try {
    await $fetch(`/api/project/${projectUid}/delete`, {
      headers: useRequestHeaders(["cookie"]),
      method: "DELETE",
    });
    projects.value.splice(projects.value.map((project: IProject) => project.uid).indexOf(projectUid), 1);
    navigateTo("/app");
  } catch (e) {
    // TODO: toast.
  }
}
export async function updateProject (projectUid: string, name: string, description?: string): Promise<IRichProject> {
  return await $fetch<IRichProject>(`/api/project/${projectUid}/edit`, {
    headers: useRequestHeaders(["cookie"]),
    method: "PUT",
    body: {
      name,
      description
    }
  });
}
