import { Link } from "react-router-dom";

type MLinkProps = {
  to: string;
  text?: string;
  children?: React.ReactNode;
};

const MLink = ({ to, text, children }: MLinkProps) => {
  return (
    <>
      <Link className="text-blue-600  hover:underline" to={`${to}`}>
        {text ? text : children}
      </Link>
    </>
  );
};

export default MLink;
