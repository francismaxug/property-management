import React from "react";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
const PropertyImages = ({ image }: { image: string[] | undefined }) => {
  return (
    <Gallery>
      <section className=" bg-blue-50 p-4">
        <div className=" container mx-auto">
          {image?.length === 1 ? (
            <Item
              original={image![0]}
              thumbnail={image![0]}
              width="1024"
              height="768"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={image![0]}
                  alt="details imges"
                  width={1800}
                  height={400}
                  priority
                  className=" object-cover mx-auto rounded-xl h-[400px]"
                />
              )}
            </Item>
          ) : (
            <div className=" grid sm:grid-cols-2 gap-4">
              {image?.map((imagee, index) => (
                <div
                  key={index}
                  className={`${
                    image.length === 3 && index === 2
                      ? "sm:col-span-2"
                      : " col-span-1"
                  } `}
                >
                  <Item
                    original={imagee}
                    thumbnail={imagee}
                    width="1024"
                    height="768"
                  >
                    {({ ref, open }) => (
                      <Image
                        src={imagee}
                        ref={ref}
                        onClick={open}
                        alt=""
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority
                        className=" object-cover w-full rounded-xl h-[400px]"
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;
