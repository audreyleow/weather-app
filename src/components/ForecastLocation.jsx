import calendarLogo from "../assets/calendar.png";
import AspectRatioBox from "./AspectRatioBox";

export default function ForecastLocation() {
  return (
    <div className="forecast-content">
      <div className="summary">
        <img src={calendarLogo} alt="placeholder" className="calendar" />
        Location
      </div>
      <div className="divider" />
      <div style={{ display: "flex", margin: "15px 20px 10px" }}>
        <AspectRatioBox aspectWidth={4} aspectHeight={3}>
          <iframe
            style={{
              border: 0,
            }}
            title="Forecast location"
            width="100%"
            height="100%"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=Singapore`}
          />
        </AspectRatioBox>
      </div>
    </div>
  );
}
