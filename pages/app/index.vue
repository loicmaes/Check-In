<script setup lang="ts">
import {definePageMeta, useSeoMeta} from "#imports";
import ActiveCard from "~/components/specifics/sessions/ActiveCard.vue";
import {AreaChart} from "~/components/ui/chart-area";
import {Card, CardContent, CardHeader} from "~/components/ui/card";
import type {ISession} from "~/types/session";
import {CurveType} from "@unovis/ts";
import ElapsedChartTooltip from "~/components/specifics/sessions/ElapsedChartTooltip.vue";
import type {IUser} from "~/types/user";

definePageMeta({
  layout: "app"
});

const user = useState<IUser>("user");
useSeoMeta({
  title: `${user.value.username} · Dashboard`
});

const session = undefined;
/*const session: ISession = {
  uid: "",
  name: "",
  type: "live",
  startedAt: new Date(2024, 6, 26, 1, 23, 0),
};*/
const timeElapsedDuringThisWeek = [
  { name: "Monday", "Time Elapsed": 1.6 },
  { name: "Tuesday", "Time Elapsed": 6.2 },
  { name: "Wednesday", "Time Elapsed": 4.3 },
  { name: "Thursday", "Time Elapsed": 3.2 },
  { name: "Friday", "Time Elapsed": 6.8 },
  { name: "Saturday", "Time Elapsed": 0 },
  { name: "Sunday", "Time Elapsed": 0 },
];
</script>

<template>
  <main class="app-page">
    <ActiveCard :session="session" />
    <Card>
      <CardHeader class="items-end">
        <p class="text-sm">this week</p>
      </CardHeader>
      <CardContent class="px-0">
        <AreaChart
            :data="timeElapsedDuringThisWeek"
            index="name"
            :categories="['Time Elapsed']"
            :curve-type="CurveType.Linear"
            :show-legend="false"
            :custom-tooltip="ElapsedChartTooltip"
        />
      </CardContent>
    </Card>
  </main>
</template>
