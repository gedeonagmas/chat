import React, { useContext, useState } from 'react';
import { navContext } from '../../App';
import { Telegram, Chat } from '@mui/icons-material';

const Header = () => {
  const lang = useContext(navContext);
  const [language, setLanguage] = useState(false);
  return (
    <div className="fixed flex items-center justify-between px-4 z-30 font-bold top-0 left-0 h-14 w-[100%] bg-white">
      <div className="text-lg cursor-pointer  text-[#00aeff] h-auto relative w-auto mt-4 px-3 flex gap-2 font-bold">
        <Chat sx={{ width: 44, height: 44 }} className="" />{' '}
        <div className="flex -mt-2 text-[18px] flex-col items-center justify-center">
          <p className="">{lang.lang === 'amh' ? 'ዌብ ቴሌግራም' : 'Web Gram'}</p>
          <p className="-mt-2 text-sm text-gray-800">
            {lang.lang === 'amh' ? 'ያልተገደበ መልዕክት' : 'ultimate chat'}
          </p>
        </div>
      </div>
      {language && (
        <div
          onMouseLeave={() => setLanguage(false)}
          className="h-auto absolute shadow shadow-black right-4 top-2 bg-white flex flex-col items-center justify-center w-auto py-2 gap-2 px-4 rounded-lg border"
        >
          <p
            onClick={() => {
              lang.setLang('amh');
              setLanguage(false);
            }}
            className={`${
              lang.lang === 'amh'
                ? 'bg-[#00aeff] text-white'
                : 'text-black bg-white'
            } w-20 cursor-pointer text-center px-2 py-1 rounded-sm `}
          >
            አማርኛ
          </p>
          <p
            onClick={() => {
              lang.setLang('Eng');
              setLanguage(false);
            }}
            className={`${
              lang.lang !== 'amh'
                ? 'bg-[#00aeff] text-white'
                : 'text-black bg-white'
            } w-20 cursor-pointer text-center px-2 py-1 rounded-sm `}
          >
            English
          </p>
        </div>
      )}
      <p
        onMouseOver={() => setLanguage(true)}
        className="text-lg font-bold text-black"
      >
        {lang.lang === 'amh' ? 'ቋንቋዎች' : 'Languages'}
      </p>
    </div>
  );
};

export default Header;
