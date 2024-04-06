import Link from "next/link";

interface btnInfo {
  text: string;
  link: string;
  backgroundColor: string;
}
interface InfoBoxesProps {
  children?: React.ReactNode;
  backkgroundColor?: string;
  textColor?: string;
  buttonInfo?: btnInfo;
  heading: string;
}
const InfoBoxes = ({
  children,
  backkgroundColor = "bg-gray-100",
  textColor = " text-gray-800",
  buttonInfo,
  heading,
}: InfoBoxesProps) => {
  return (
    <>
      <div className={`${backkgroundColor} p-6 rounded-lg shadow-md `}>
        <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
        <p className={` ${textColor} mt-2 mb-4`}>{children}</p>
        <Link
          href={buttonInfo?.link || "/properties"}
          className={`inline-block ${buttonInfo?.backgroundColor} text-white rounded-lg px-4 py-2 hover:opacity-80`}
        >
          {buttonInfo?.text || "Learn More"}
        </Link>
      </div>
    </>
  );
};

export default InfoBoxes;
