// import React, { useEffect } from "react";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../ReduxSystem/Store/Store";
import { FaPen, FaPlay } from "react-icons/fa6";
import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  WrapItem,
} from "@chakra-ui/react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { MdOutlineFavorite } from "react-icons/md";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { useEffect, useState } from "react";
import { reciters } from "../types/data";
import { BsPlayCircleFill } from "react-icons/bs";
import { PlayList } from "../ReduxSystem/userSlice";
import { ClearFavList, ClearLastPlayed, ClearPlaylist } from "../ReduxSystem/ClearHistorySlice";
import { clickedSuwra } from "../ReduxSystem/recitersData";
import { choosenRadioAudio } from "../ReduxSystem/RadioSlice";

const ProfilePage = () => {
  const [array, setarray] = useState<PlayList[]>([]);
  const dispatch = useDispatch<AppDispatch>()
  const { language } = useSelector((state: RootState) => state.Settings);
  const { userobjecttype } = useSelector(
    (state: RootState) => state.userslogindata
  );
  type obj = {
    name: string;
    src: string;
    writer: string;
    id: number;
  };
  useEffect(() => {
    for (let _x in userobjecttype?.PlayList) {
      setarray(Object.values(userobjecttype?.PlayList));
    }
  }, [userobjecttype?.PlayList]);

  return (
    <div id="backgroundcolor" className="">
      {/* MyInfo */}
      <div className="flex justify-between items-center p-10">
        <div className=" flex justify-start gap-3 items-center">
          <WrapItem>
            <Avatar size={"2xl"} bg="teal.500" />
          </WrapItem>
          <h1 className="text-white ">
            <span className=" text-xl text-gray-600">{language === "ar" ? "اسم المستخدم" : "UserName:"}</span>
            <br />
            {userobjecttype?.username}

            <br />
          </h1>
        </div>
        <FaPen className="text-white" />
      </div>
      {/* مواخخرا */}
      <div className="p-10">
        <div className="flex justify-between">
          <h1 className="text-2xl text-white flex items-center gap-2">
            {language === "ar" ? "التشغيل مواخرا" : "Last Played"}
            <IoPlayCircleOutline className="text-4xl" />
          </h1>
          <span
            onClick={() => dispatch(ClearLastPlayed(
              userobjecttype?.id
            ))}
            className="flex text-sm text-green-600 items-center gap-1 cursor-pointer">
            <h1 className="">
              {language === "ar" ? "مسح التاريخ " : "ClearHistory"}
            </h1>
            <FaPen />
          </span>
        </div>
      </div>
      <Flex overflowX={"scroll"} className=" ">
        {userobjecttype?.LastPlayed.map(
          (
            {
              currentplaylist,
              recitersid,
            }: {
              currentplaylist: {
                name: string;
                writer: string;
              };
              recitersid: number;
            },
            index
          ) => (
            <div key={index}>
              <div className="tablet:p-5 mobile:p-3  transition ease-linear  !cursor-pointer group hover:bg-[#58545485]  ">
                <WrapItem className="group " position={"relative"}>
                  <Avatar
                    //   onClick={() => {
                    //     navigator(`/home/ReciterisDetails/${id}`);
                    //     dispatch(setChangestate());
                    //   }}
                    size="2xl"
                    name={currentplaylist.writer}
                    src={reciters[recitersid]}
                  />
                  <BsPlayCircleFill className="rounded-full scale-0 group-hover:scale-110 text-[#1DB954] duration-500  absolute bottom-0    bg-[#000000] text-5xl " />
                </WrapItem>
                <div className="mt-4 flex flex-col gap-2">
                  <h1 className="text-white">{currentplaylist.name}</h1>
                  <h2 className="text-gray-500">
                    {language === "ar" ? "القراء" : " Reciters"}
                  </h2>
                </div>
              </div>
            </div>
          )
        )}
      </Flex>

      {/* القائمة المفضل */}
      <div className="p-10">
        <div className="flex justify-between">
          <h1

            className="text-2xl text-white flex items-center gap-2">
            {language === "ar" ? "القائمة المفضلة" : "favouriteList"}
            <MdOutlineFavorite className="text-red-400 text-4xl " />
          </h1>
          <span
            onClick={() => dispatch(ClearFavList(
              userobjecttype?.id
            ))}
            className="flex text-sm text-green-600 items-center gap-1 cursor-pointer">
            <h1 className="">
              {language === "ar" ? "مسح التاريخ " : "ClearHistory"}
            </h1>
            <FaPen />
          </span>
        </div>
      </div>
      <Flex overflowX={"scroll"} className=" ">
        {userobjecttype?.favList.map(
          (
            {
              currentreciters,
              recitersid,
            }: {
              currentreciters: {
                name: string;
              };
              recitersid: number;
            },
            index
          ) => (
            <div key={index}>
              <div className="tablet:p-5 mobile:p-3  transition ease-linear  !cursor-pointer group hover:bg-[#58545485]  ">
                <WrapItem className="group " position={"relative"}>
                  <Avatar
                    //   onClick={() => {
                    //     navigator(`/home/ReciterisDetails/${id}`);
                    //     dispatch(setChangestate());
                    //   }}
                    size="2xl"
                    name={currentreciters.name}
                    src={reciters[recitersid]}
                  />
                  <BsPlayCircleFill className="rounded-full scale-0 group-hover:scale-110 text-[#1DB954] duration-500  absolute bottom-0    bg-[#000000] text-5xl " />
                </WrapItem>
                <div className="mt-4 flex flex-col gap-2">
                  <h1 className="text-white">{currentreciters.name}</h1>
                  <h2 className="text-gray-500">
                    {language === "ar" ? "القراء" : " Reciters"}
                  </h2>
                </div>
              </div>
            </div>
          )
        )}
      </Flex>
      {/* قائمة التشغيل الخاصة بي */}
      <div className="p-10">
        <div className="flex justify-between">
          <h1 className="text-xl text-white flex items-center gap-2">
            {language === "ar" ? "قائمة التشغيل الخاصة بي" : "MyPlayList"}
            <MdOutlinePlaylistAddCheck className="text-4xl" />
          </h1>
          <span
            onClick={() => dispatch(ClearPlaylist(
              userobjecttype?.id
            ))}
            className="flex text-sm text-green-600 items-center gap-1 cursor-pointer">
            <h1 className="">
              {language === "ar" ? "مسح التاريخ " : "ClearHistory"}
            </h1>
            <FaPen />
          </span>
        </div>
      </div>
      <div>
        {array.map(({ Title, data }: { Title: string; data: obj[] }, index) => (
          <Grid
            key={index}
            p={10}
            className="laptop:grid-cols-5 tablet:grid-cols-1 mobile:grid-cols-1 "
            gap={4}
          >
            <GridItem
              className="!flex flex-col !items-start justify-center gap-4 "
              colSpan={1}
            >
              <WrapItem>
                <Avatar size="2xl" name={Title} />
              </WrapItem>
              <h1 className="text-white flex gap-3 items-center">
                <span className="text-2xl">Name:</span>
                {Title}
              </h1>
            </GridItem>

            <GridItem
              className="mobile:col-span-3 tablet:col-span-4 p-4 "
              id="backgroundcolor"
            >
              {data.map(({ name, writer, src, id }: obj, index) => (
                <Box
                  cursor={"pointer"}
                  key={index}
                  bg="transparent"
                  w="100%"
                  p={4}
                  color="white"
                  className="group hover:bg-[#58545485]  "
                >
                  <HStack spacing="24px">
                    <Box
                      w="70px"
                      className="text-center font-extrabold text-xl"
                    >
                      <div className=" ms-20 flex flex-row-reverse items-center gap-5">
                        {
                          <Avatar
                            // src={reciters[]}
                            name={`${writer}`}
                          />
                        }
                        <div className="group flex duration-150 cursor-pointer">
                          <h1 className="group-hover:hidden text-gray-400">
                            {index + 1}
                          </h1>
                          <FaPlay
                            onClick={() => {
                              dispatch(
                                choosenRadioAudio({
                                  nameAudio: name,
                                  urlaudio: src,
                                  id: id,
                                  index: index,
                                  url: ""
                                })
                              ),
                                dispatch(clickedSuwra(
                                  {
                                    currentplaylist: [{ name, writer, src, id }],
                                    index: (index = 0),
                                    boolean: true,
                                  }
                                ))
                            }}
                            className=" hidden group-hover:block text-xl text-white " />
                        </div>
                      </div>
                    </Box>
                    <Box
                      w="1170px"
                      className={`text-center font-extrabold ${language === "ar"
                        ? "mobile:text-[1.3em] tablet:text-[1.5] laptop:text-2xl"
                        : "mobile:text-[0.7em] tablet:text-sm laptop:text-xl"
                        } `}
                    >
                      {name}
                    </Box>
                    <Box
                      w="1180px"
                      className="text-center font-extrabold mobile:text-[0.8em] tablet:text-sm laptop:text-xl "
                    >
                      {writer}
                    </Box>
                  </HStack>
                </Box>
              ))}
            </GridItem>
          </Grid>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
