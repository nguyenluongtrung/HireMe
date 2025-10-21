export type SpinnerProps = {
    className?: string;
    iconClassName?: string;
    customStroke?: string;
  };
  
  const Spinner = ({ className, iconClassName, customStroke }: SpinnerProps) => {
    return (
      <div
        role="status"
        className={`flex items-center justify-center z-90 h-screen ${className}`}>
        <svg
          aria-hidden="true"
          className={`w-10 h-10 mr-2 animate-spin ${iconClassName}`}
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={customStroke ? customStroke : '#2196F3'}
            strokeWidth="10"
            fill="none"
            strokeLinecap="butt"
            strokeDasharray="176 75" // 176 visible, rest is gap
          />
        </svg>
      </div>
    );
  };
  
  export default Spinner;
  