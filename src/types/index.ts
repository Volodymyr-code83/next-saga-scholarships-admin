export interface TeamMemberDataType {
  id: string;
  imageUrl: string;
}

export interface StoryDataType {
  id: string;
  imageUrl: string;
  heading: string;
  subHeading: string;
  detailsLink: string;
}

export interface PageHeaderDataType {
  heading: string;
  subHeading: string;
}

export interface AboutPageDataType {
  imageUrl: string;
  text: string;
  d_title: string;
  d_imageUrl: string;
  d_text: string;
}

export interface PlayerDataType {
  imageUrl: string;
  name: string;
  date: string;
  sport: string;
  race: string;
  country: string;
  university: string;
}

export interface BlogDataType {
  imageUrl: string;
  title: string;
  details: string;
}

export interface ServicePageDataType {
  imageUrl: string;
  text: string;
}
