import * as THREE from "three";
import React, { useRef, useMemo, useEffect, useState } from "react";
import { extend, useLoader, useFrame, Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Water } from "three-stdlib";

extend({ Water });

const MINUTES_IN_A_DAY = 24 * 60;

const X_MAX = 2000;
const X_STEP = (2 * X_MAX) / MINUTES_IN_A_DAY;

const Y_MIN = -100;
const Y_MAX = 30;
const Y_STEP = (4 * -Y_MIN) / MINUTES_IN_A_DAY;

function Ocean() {
  const waterRef = useRef();
  const waterNormals = useLoader(THREE.TextureLoader, "/waternormals.jpeg");
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
    }),
    [waterNormals]
  );
  useFrame(
    (_, delta) => (waterRef.current.material.uniforms.time.value += delta)
  );
  return (
    <water ref={waterRef} args={[geom, config]} rotation-x={-Math.PI / 2} />
  );
}

function AppSky({ speedUp }) {
  const skyRef = useRef();

  const [minutesPassedToday, setMinutesPassedToday] = useState(
    getMinutesPassedToday()
  );

  useEffect(() => {
    let intervalId;

    if (speedUp) {
      intervalId = setInterval(() => {
        setMinutesPassedToday((time) => {
          const result = time + 1;
          if (result > MINUTES_IN_A_DAY) {
            return 0;
          }
          return result;
        });
      }, 10);
    } else {
      intervalId = setInterval(() => {
        setMinutesPassedToday(getMinutesPassedToday());
      }, 1000 * 60);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [speedUp]);

  useEffect(() => {
    skyRef.current.material.uniforms.sunPosition.value.y = Math.min(
      Y_MAX,
      minutesPassedToday > MINUTES_IN_A_DAY / 2
        ? -Y_MIN - Y_STEP * (minutesPassedToday - MINUTES_IN_A_DAY / 2)
        : Y_STEP * minutesPassedToday + Y_MIN
    );

    skyRef.current.material.uniforms.sunPosition.value.x =
      X_MAX - minutesPassedToday * X_STEP;
  }, [minutesPassedToday]);

  return (
    <Sky
      ref={skyRef}
      sunPosition={[0, 0, -1000]}
      turbidity={10}
      rayleigh={2}
      mieCoefficient={0.005}
      mieDirectionalG={0.95}
    />
  );
}

export default function Background({ speedUp }) {
  return (
    <Canvas camera={{ position: [0, 5, 100], fov: 55, near: 1, far: 20000 }}>
      <Ocean />
      <AppSky speedUp={speedUp} />
    </Canvas>
  );
}

function getMinutesPassedToday() {
  const timestamp = Date.now();
  const utcMidnightTimestamp =
    Math.floor(timestamp / (1000 * 60 * 60 * 24)) * (1000 * 60 * 60 * 24);
  const sgMidnightTimestamp = utcMidnightTimestamp - 1000 * 60 * 60 * 8;
  const msPassedToday = timestamp - sgMidnightTimestamp;

  return Math.floor(msPassedToday / (1000 * 60));
}
