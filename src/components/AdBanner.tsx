interface AdBannerProps {
  slot: string;
  className?: string;
}

const AdBanner = ({ slot, className = "" }: AdBannerProps) => {
  return (
    <div className={`text-center ${className}`}>
      <ins
        className="adsbygoogle block"
        data-ad-client="TU_ID"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;
