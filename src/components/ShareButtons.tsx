import { Property } from "@/lib/types";
import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  XIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
const ShareButtons = ({ property }: { property: Property | null }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property?._id}`;
  return (
    <>
      <h3 className=" text-xl font-bold text-center">Share This Property</h3>
      <div className=" flex justify-center gap-x-3 pb-3">
        <FacebookShareButton
          url={shareUrl}
          hashtag={`#${property?.type.replace(/\s/g, "")}forRent`}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={property?.name}
          hashtags={[`#${property?.type.replace(/\s/g, "")}forRent`]}
        >
          <XIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title={property?.name}
          separator=":: "
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <EmailShareButton
          url={shareUrl}
          subject={property?.name}
          body={`Check out this property: ${shareUrl}`}
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    </>
  );
};
export default ShareButtons;
