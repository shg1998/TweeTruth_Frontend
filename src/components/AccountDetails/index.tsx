import "./index.css";

interface PropsTypes {
  selectedId: number;
}

const AccountDetails: React.FC<PropsTypes> = ({ selectedId }) => {
  return <>{selectedId}</>;
};

export default AccountDetails;
