<script setup lang="ts">
import {SideBarSection, SideBarLabel, SideBarItem, SideBarHeader} from "./";
import type {IProject} from "~/types/project";
import {ref} from "vue";
import {useState} from "#imports";
import CreateDialog from "~/components/shared/app/project/CreateDialog.vue";

const projects = useState<IProject[]>("projects");

const newProjectDialog = ref<boolean>(false);
</script>

<template>
  <div class="flex flex-col gap-6">
    <SideBarSection>
      <SideBarItem projectUid="draft">Draft</SideBarItem>
    </SideBarSection>
    <SideBarSection>
      <CreateDialog :opened="newProjectDialog" @update:open="newProjectDialog = $event" />

      <SideBarHeader @addProject="newProjectDialog = true">
        <SideBarLabel>Projects</SideBarLabel>
      </SideBarHeader>
      <template v-if="projects.length">
        <SideBarItem :projectUid="project.uid" v-for="project in projects" :key="project.uid">{{ project.name }}</SideBarItem>
      </template>
    </SideBarSection>
  </div>
</template>
