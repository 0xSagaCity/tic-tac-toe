import CopyId from "../svg/CopyId";

export default function YourIdComponent() {
  return (
    <div className="YourId">
      <span>Your id</span>
      <div className="YourIdInner__Wrapper">
        <span className="YourId__Text">az1cp-129ak-2810n-9ak0q</span>
        <button className="YourId__Button">
          <CopyId />
        </button>
      </div>
    </div>
  );
}
