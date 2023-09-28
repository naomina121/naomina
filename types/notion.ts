export type RichTextTyeps = [
  {
    type: string;
    text?: {
      content: string;
      link: null | {
        url: string;
      };
    };
    mention?: {
      type: string;
      date: {
        start: Date;
        end: null | Date;
        time_zone: null | string;
      };
    };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href: null | string;
  }
];

export type NotionTypes = {
  type: string;
  heading_2?: {
    is_toggleable: boolean;
    color: string;
    rich_text: RichTextTyeps;
  };
  heading_3?: {
    is_toggleable: boolean;
    color: string;
    rich_text: RichTextTyeps;
  };
  image?: {
    caption: [];
    type: string;
    file?: {
      url: string;
      expiry_time: Date;
    };
    external?: {
      url: string;
    };
  };
  paragraph?: {
    rich_text: RichTextTyeps;
    color: string;
  };
  code?: {
    caption: [];
    rich_text: RichTextTyeps;
    language: string;
  };
  bulleted_list_item?: {
    rich_text: RichTextTyeps;
    color: string;
    children?: [
      { type: string },
      { bulleted_list_item: NotionTypes['bulleted_list_item'] }
    ];
  };
  numbered_list_item?: {
    rich_text: RichTextTyeps;
    color: string;
    children?: [
      { type: string },
      { numbred_list_item: NotionTypes['numbered_list_item'] }
    ];
  };
  quote?: {
    rich_text: RichTextTyeps;
    color: string;
    children?: [
      { type: string },
      {
        quote: NotionTypes['quote'];
      }
    ];
  };
};
