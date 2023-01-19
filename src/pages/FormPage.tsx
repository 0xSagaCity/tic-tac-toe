import YourIdComponent from "../component/YourIdComponent";
import FormDialog from "../component/FormDialog";

export default function FormPage() {
  return (
    <div className="FormPage">
      <div className="FormPageTop">
        <h2 className="FormPageTop__Title GradientText">Send challenge</h2>
        <YourIdComponent />
        <FormDialog />
      </div>
    </div>
  );
}
