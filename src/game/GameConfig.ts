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

export const MAX_CONSTRAIN = 100;
export const MAX_VELOCITY = 50;

export const PLATFORM_HEIGHT = 128;

export const PLATFORM_Y = heightGame * 0.9;

export const CASTLE_BASE_Y = PLATFORM_Y - PLATFORM_HEIGHT;
export const CASTLE_BASE_X = widthGame * 0.7;

export const SLING_SHOT_Y = CASTLE_BASE_Y - MAX_CONSTRAIN - 60;
export const SLING_SHOT_X = 400;