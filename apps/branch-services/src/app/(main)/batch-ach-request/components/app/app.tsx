// 'use client';

// import React, { ReactNode, useEffect } from 'react';

// import * as S from './app.style';
// import { useWidgetStore } from '../../store';

// const App: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const { reset } = useWidgetStore((state) => state);
//   // useEffect(() => {
//   //   console.log('bacth ach request');
//   // }, []);

//   useEffect(() => {
//     console.log('=================> reset app');
//     reset();
//   }, []);

//   return <S.AppContainer>{children}</S.AppContainer>;
// };

// export default App;
