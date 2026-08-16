"use client";

import { LoginShowcase } from "@/components/create/AuthBlocks";

import { CounterWidget } from "./counter";

import {
  ControlPanelWidget,
  DisasterAlerts,
  HomeAssistant,
  SystemControls,
  VehicleWidget,
  WeatherWidget,
} from "./atmosphere";
import { Masonry } from "./card-ui";
import {
  BankWidget,
  DeliveryWidget,
  NewsWidget,
  TravelWidget,
  WorldWidgets,
} from "./economy";
import {
  DiscordProfile,
  Messenger,
  MusicPlayer,
  ProfileWidget,
} from "./social";
import {
  CyberpsychosisMonitor,
  DeviantMonitor,
  HealthMonitor,
  NetMonitor,
  SleepTracker,
  SystemTelemetry,
} from "./telemetry";
import { TodoWidget } from "./todo";
import { GlitchWidget } from "./glitch";

/** Consolidated cyberpunk widgets — re-theme as the axes change. */
export function CreateShowcase() {
  return (
    <div>
      <div className="mb-4 flex items-baseline gap-3">
        <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-foreground">
          Cyberpunk widgets
        </h2>
        <span className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
          tech · net · corp · street
        </span>
      </div>
      <Masonry>
        <DeliveryWidget />
        <WorldWidgets />
        <HealthMonitor />
        <WeatherWidget />
        <SystemTelemetry />
        <CounterWidget />
        <DisasterAlerts />
        <NetMonitor />
        <GlitchWidget />
        <TravelWidget />
        <SleepTracker />
        <DeviantMonitor />
        <CyberpsychosisMonitor />
        <ControlPanelWidget />
        <NewsWidget />
        <HomeAssistant />
        <SystemControls />
        <ProfileWidget />
        <Messenger />
        <TodoWidget />
        <BankWidget />
        <MusicPlayer />
        <DiscordProfile />
        <VehicleWidget />
        <LoginShowcase />
      </Masonry>
    </div>
  );
}
