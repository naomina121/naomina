export type RichTextType = {
	type: string;
	text?: {
		content: string;
		link: null | {
			url: string;
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
};

export type NotionTypes = {
	type: string;
	heading_2?: {
		is_toggleable: boolean;
		color: string;
		rich_text: RichTextType[];
	};
	heading_3?: {
		is_toggleable: boolean;
		color: string;
		rich_text: RichTextType[];
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
		rich_text: RichTextType[];
		color: string;
	};
	code?: {
		caption: [];
		rich_text: RichTextType[];
		language: string;
	};
	bulleted_list_item?: {
		rich_text: RichTextType[];
		color: string;
		children?: [
			{ type: string },
			{ bulleted_list_item: NotionTypes['bulleted_list_item'] }
		];
	};
	numbered_list_item?: {
		rich_text: RichTextType[];
		color: string;
		children?: [
			{ type: string },
			{ numbred_list_item: NotionTypes['numbered_list_item'] }
		];
	};
	quote?: {
		rich_text: RichTextType[];
		color: string;
		children?: [
			{ type: string },
			{
				quote: NotionTypes['quote'];
			}
		];
	};
	toggle?: {
		rich_text: RichTextType[];
		color: string;
		children?: [
			{ type?: string },
			{
				paragraph?: NotionTypes['paragraph'];
			}
		];
	};
	callout?: {
		rich_text: RichTextType[];
		color: string;
		icon?: {
			emoji: string;
		};
	};
	video?: {
		caption?: [];
		type: string;
		file?: {
			url: string;
			expiry_time: Date;
		};
		external?: {
			url: string;
		};
	};
	divider?: {
		type: string;
	};
	embed?: {
		url: string;
	};
	table?: {
		table_width: number;
		has_column_header: boolean;
		has_row_header: boolean;
	};
	table_row?: {
		cells: any;
	};
};
