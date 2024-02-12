import { Link } from "react-router-dom";

type MLinkProps = {
  to: string;
  text: string;
};

const MLink = ({ to, text }: MLinkProps) => {
  return (
    <>
      <Link className="text-blue-600" to={`${to}`}>
        {text}
      </Link>
    </>
  );
};

export default MLink;
