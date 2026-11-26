'use client';

import clsx from 'clsx';
import {
  useEffect,
  useRef,
  type ComponentPropsWithRef,
  type PointerEvent,
} from 'react';
import styles from './AuthCard.module.scss';

const STIFFNESS = 0.06;
const DAMPING = 0.82;
const EPSILON = 0.05;
const FRAME = 16.667;

type Motion = {
  el: HTMLElement | null;
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  last: number;
  frame: number;
};

function paint(motion: Motion) {
  motion.el?.style.setProperty('--mouse-x', `${motion.x}px`);
  motion.el?.style.setProperty('--mouse-y', `${motion.y}px`);
}

function tick(motion: Motion, time: number) {
  const dt = Math.min((time - motion.last) / FRAME, 3);
  const damping = DAMPING ** dt;
  motion.last = time;

  motion.vx = (motion.vx + (motion.tx - motion.x) * STIFFNESS * dt) * damping;
  motion.vy = (motion.vy + (motion.ty - motion.y) * STIFFNESS * dt) * damping;
  motion.x += motion.vx * dt;
  motion.y += motion.vy * dt;

  const energy =
    Math.abs(motion.tx - motion.x) +
    Math.abs(motion.ty - motion.y) +
    Math.abs(motion.vx) +
    Math.abs(motion.vy);

  if (energy > EPSILON) {
    paint(motion);
    motion.frame = requestAnimationFrame((next) => tick(motion, next));
    return;
  }

  motion.x = motion.tx;
  motion.y = motion.ty;
  paint(motion);
  motion.frame = 0;
}

function start(motion: Motion) {
  if (motion.frame) return;
  motion.last = performance.now();
  motion.frame = requestAnimationFrame((time) => tick(motion, time));
}

export function AuthCard({
  className,
  onPointerEnter,
  onPointerMove,
  ...rest
}: ComponentPropsWithRef<'section'>) {
  const motion = useRef<Motion>({
    el: null,
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    vx: 0,
    vy: 0,
    last: 0,
    frame: 0,
  });

  useEffect(() => {
    const state = motion.current;
    return () => cancelAnimationFrame(state.frame);
  }, []);

  const track = (event: PointerEvent<HTMLElement>, snap: boolean) => {
    if (event.pointerType !== 'mouse') return;

    const state = motion.current;
    const rect = event.currentTarget.getBoundingClientRect();
    state.el = event.currentTarget;
    state.tx = event.clientX - rect.left;
    state.ty = event.clientY - rect.top;

    if (snap) {
      state.x = state.tx;
      state.y = state.ty;
      state.vx = 0;
      state.vy = 0;
      paint(state);
      return;
    }

    start(state);
  };

  return (
    <section
      className={clsx(styles.card, className)}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        track(event, true);
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        track(event, false);
      }}
      {...rest}
    />
  );
}
