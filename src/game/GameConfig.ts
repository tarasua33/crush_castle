// const heightGame = 1024;
// const widthGame = 768;
// const heightGame = 768;
// const widthGame = 1024;
const heightGame = 1536;
const widthGame = 2048;

export const GAME_DIMENSIONS = {
  width: widthGame,
  height: heightGame,
};

export const CLOUDS = 10;

export const MAX_MOUNTAINS_LVL = 3;
export const MAX_CONSTRAIN = 150;
export const MAX_VELOCITY = 70;
export const TRANSFORM_ENEMY = 62;

export const PLATFORM_HEIGHT = 128;
export const PLATFORM_TILE_WIDTH = 128;
export const TRANSFORM_BRICK = 128;

export const PLATFORM_Y = heightGame * 0.9;

export const CASTLE_BASE_Y = PLATFORM_Y - PLATFORM_HEIGHT;
export const CASTLE_BASE_X = widthGame * 0.8;
export const CASTLE_BRICK_W = 96;
export const CASTLE_BRICK_H = 32;

export const SLING_SHOT_Y = CASTLE_BASE_Y - MAX_CONSTRAIN - 60;
export const SLING_SHOT_X = 375;

export const BULLET_MASS = 20;

export const BRICKS_NUMBER = 8;

// export const CAMERA_EDGE_X = 400;
// export const CAMERA_EDGE_Y = 200;