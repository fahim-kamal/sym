export function LightboxMenu({ children, showLightbox, closeLightbox }) {
  return showLightbox ? (
    <>
      <div
        className="absolute top-0 left-0 w-screen h-screen bg-black/20"
        onClick={closeLightbox}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </>
  ) : (
    <></>
  );
}
