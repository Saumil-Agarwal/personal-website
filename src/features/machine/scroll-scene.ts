/** Continuous scene position, measured from the actual document anchors. */
export function sceneAtScroll(scroll: number, anchors: readonly number[]): number {
  if (anchors.length < 2 || scroll < anchors[0]) return 0;
  for (let index = 0; index < anchors.length - 1; index++) {
    if (scroll < anchors[index + 1]) {
      return index + (scroll - anchors[index]) / (anchors[index + 1] - anchors[index]);
    }
  }
  return anchors.length - 1;
}
