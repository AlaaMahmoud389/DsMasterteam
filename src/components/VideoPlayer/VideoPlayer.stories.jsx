import React from 'react';
import { VideoPlayer } from './VideoPlayer';

export default {
  title: 'Components/VideoPlayer',
  component: VideoPlayer,
  parameters: { layout: 'padded' },
  argTypes: {
    src:           { control: 'text', description: 'Video source URL' },
    poster:        { control: 'text', description: 'Poster image URL' },
    buttonStyle:   { control: 'radio',  options: ['semi-transparent', 'primary', 'neutral'] },
    buttonSize:    { control: 'radio',  options: ['small', 'medium', 'large'] },
    autoPlay:      { control: 'boolean' },
    loop:          { control: 'boolean' },
    initialPlaying:{ control: 'boolean', description: 'Start in playing state (for demos — hover to see controls)' },
  },
};

/* ── Playground ─────────────────────────────────────────────────── */
export const Playground = {
  args: {
    src:            '',
    poster:         '',
    buttonStyle:    'semi-transparent',
    buttonSize:     'medium',
    autoPlay:       false,
    loop:           false,
    initialPlaying: false,
  },
  render: (args) => (
    <div style={{ maxWidth: 720 }}>
      <VideoPlayer {...args} src={args.src || undefined} poster={args.poster || undefined} />
      {!args.src && (
        <p style={{ marginTop: 8, fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 12, color: '#6C7C96' }}>
          Add a video URL in the <strong>src</strong> control to load a real video.
        </p>
      )}
    </div>
  ),
};

/* ── Button Styles ───────────────────────────────────────────────── */
export const ButtonStyles = {
  name: 'Center Button — Styles',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {[
        { style: 'semi-transparent', label: 'Semi-Transparent (default)' },
        { style: 'primary',          label: 'Primary' },
        { style: 'neutral',          label: 'Neutral' },
      ].map(({ style, label }) => (
        <div key={style} style={{ flex: '1 1 280px', minWidth: 240 }}>
          <p style={{ margin: '0 0 8px', fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>
            {label}
          </p>
          <VideoPlayer buttonStyle={style} buttonSize="medium" />
        </div>
      ))}
    </div>
  ),
};

/* ── Button Sizes ────────────────────────────────────────────────── */
export const ButtonSizes = {
  name: 'Center Button — Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {[
        { size: 'small',  label: 'Small — 32 × 32 px' },
        { size: 'medium', label: 'Medium — 48 × 48 px' },
        { size: 'large',  label: 'Large — 64 × 64 px' },
      ].map(({ size, label }) => (
        <div key={size} style={{ flex: '1 1 280px', minWidth: 240 }}>
          <p style={{ margin: '0 0 8px', fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>
            {label}
          </p>
          <VideoPlayer buttonStyle="semi-transparent" buttonSize={size} />
        </div>
      ))}
    </div>
  ),
};

/* ── Controls Bar ────────────────────────────────────────────────── */
export const ControlsBar = {
  name: 'Controls Bar (hover to reveal)',
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <VideoPlayer
        buttonStyle="semi-transparent"
        buttonSize="medium"
        initialPlaying={true}
      />
      <p style={{ marginTop: 8, fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 12, color: '#6C7C96' }}>
        The player starts in playing state — hover to reveal the progress bar, play/pause, volume, timestamp, and fullscreen button.
      </p>
    </div>
  ),
};

/* ── With Real Video ─────────────────────────────────────────────── */
export const WithVideo = {
  name: 'With Real Video',
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <VideoPlayer
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
        buttonStyle="semi-transparent"
        buttonSize="medium"
      />
      <p style={{ marginTop: 8, fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 12, color: '#6C7C96' }}>
        Click ▶ to play · hover the video while playing to see the controls bar · click fullscreen to expand
      </p>
    </div>
  ),
};

/* ── All Sizes Side by Side ──────────────────────────────────────── */
export const AllButtonStylesOnVideo = {
  name: 'All Styles — With Video',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[
        { style: 'semi-transparent', label: 'Semi-Transparent' },
        { style: 'primary',          label: 'Primary' },
        { style: 'neutral',          label: 'Neutral' },
      ].map(({ style, label }) => (
        <div key={style}>
          <p style={{ margin: '0 0 8px', fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 12, fontWeight: 600, color: '#374151' }}>
            {label}
          </p>
          <div style={{ maxWidth: 480 }}>
            <VideoPlayer
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
              buttonStyle={style}
              buttonSize="medium"
            />
          </div>
        </div>
      ))}
    </div>
  ),
};
