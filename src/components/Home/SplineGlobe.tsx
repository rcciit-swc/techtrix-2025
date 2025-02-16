import Spline from '@splinetool/react-spline/next';

const SplineGlobe = () => {
  return (
    <main className="min-w-[70vw] mx-auto flex justify-center h-[60vh] items-center">
      {' '}
      <Spline
        scene="https://prod.spline.design/N5LrKJWEpHiokFlZ/scene.splinecode"
        className="object-cover  mx-auto "
        style={{
          width: '60vw',
          height: '70vh',
        }}
      />

    </main>
  );
};

export default SplineGlobe;
