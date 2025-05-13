import { create } from 'zustand';
import { axiosInstance } from '../api/axios';

type ChannelItemType = {
  id: string;
  name: string;
  to: string;
  color: string;
  colorLight: string;
  colorDark: string;
};

type ChannelStore = {
  channels: ChannelItemType[];
  fetchChannels: () => Promise<void>;
};

export const useChannelItemStore = create<ChannelStore>((set) => ({
  channels: [],
  fetchChannels: async () => {
    const result = await axiosInstance.get('/channels');

    const menuItems = result.data.map((channel: Channel, index: number) => {
      let cName = '';
      let cColor = '';
      let cColorLight = '';
      let cColorDark = '';
      let cTo = '';

      switch (channel.name) {
        case 'MysteryCode':
          cName = '이거 왜 되지?';
          cColorLight = '#10215C';
          cColorDark = '#19A9BE';
          cTo = '/channel/1';
          break;
        case 'DeskSetup':
          cName = '이거 왜 안 쓰지?';
          cColorLight = '#3380DE';
          cColorDark = '#3380DE';
          cTo = '/channel/2';
          break;
        case 'Vote':
          cName = '골라봐';
          cColorLight = '#60A7F7';
          cColorDark = '#9E68E9';
          cTo = '/channel/3';
          break;
        default:
          cName = channel.name;
          cColor = `#${Math.floor(Math.random() * 0xffffff)
            .toString(16)
            .padStart(6, '0')}`;
          cTo = `/channel/${index}`;
      }

      return {
        id: channel._id,
        name: cName,
        to: cTo,
        color: cColor,
        colorLight: cColorLight,
        colorDark: cColorDark,
      };
    });
    set({ channels: menuItems });
  },
}));
