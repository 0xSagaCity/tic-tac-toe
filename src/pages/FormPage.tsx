import YourIdComponent from "../component/YourIdComponent";
import FormDialog from "../component/FormDialog";
import "../styles/FormPage.scss";

export default function FormPage() {
  return (
    <div className="FormPage">
      <div className="FormPageTop">
        <h2 className="FormPageTop__Title PageHeadline">Send challenge</h2>
        <YourIdComponent />
        <FormDialog />
      </div>
    </div>
  );
}
