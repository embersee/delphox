export default function Background() {
  return (
    <div className="fixed left-0 top-0 -z-50 ">
      <div className="sticky left-0 top-0 h-screen w-screen overflow-hidden  ">
        <div className="absolute inset-0 -z-10 bg-muted-foreground/20 " />
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs className="bg-mask">
            <pattern
              id="dotted-pattern"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="3" cy="3" r="1" fill="black" />
            </pattern>
            <mask id="dots-mask">
              <rect width="100%" height="100%" fill="white" />
              <rect width="100%" height="100%" fill="url(#dotted-pattern)" />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="hsl(var(--background))"
            mask="url(#dots-mask)"
          />
        </svg>
      </div>
    </div>
  );
}
