console.log('');
// import { WheelModule } from '~/pages/DecisionPicker/components/Conteiner/Wheel/wheel.ts';
// import { store } from '~/store/store.ts';
//
// type WheelModelType = {
//   drawWheel: () => void;
//   rotateWheel: (angle: number, duration: number) => void;
// };
//
// function createWheelModel(): WheelModelType {
//   const wheel = WheelModule();
//   return {
//     drawWheel: (): void => {
//       const wheelSectors = store
//         .getData()
//         .optionList.list.map((option) => Number.parseFloat(option.weight));
//       const wheelTitle = store.getData().optionList.list.map((option) => option.title);
//
//       wheel.drawWheel(wheelSectors, wheelTitle);
//     },
//     rotateWheel: (angle: number, duration: number): void => {
//       wheel.rotateWheel(angle, duration);
//     },
//   };
// }
//
// export { createWheelModel };
