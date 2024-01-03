import React from "react";
import { FiArrowRight } from "react-icons/fi";

interface footerProps {
	menuLayout: menuLayout[];
	menu4: menu[];
	signupText: string;
	connectText: string;
	fbLink: string;
	instaLink: string;
	placeHolder: string;
	socialmediaImage: image[];
}
type image = {
	carouselImage: string;
	href: string;
};

type menu = {
	__editorItemTitle: string;
	label: string;
	href: string;
};

type menuLayout = {
	menuHeader: string;
	menuItems: menu[];
};
const FooterDesktop: StorefrontFunctionComponent<footerProps> = (props) => {
	return (
		<div className="w-100 bg-light-gray">
			<div className=" flex  ">
				<div className="flex justify-around  w-100-ns">
					{props.menuLayout?.map((menuLayoutItem, index) => {
						return (
							<div key={index} className="w-25-l w-50-m w-100 mt-2">
								<h2> {menuLayoutItem.menuHeader}</h2>

								{menuLayoutItem.menuItems?.map((menu, subIndex) => {
									return (
										<div className=" mb3 p20" key={subIndex}>
											<a
												key={subIndex}
												href={menu.href}
												className=" black-80 no-underline"
											>
												{menu.label}
												{subIndex !== menuLayoutItem.menuItems.length - 1 && (
													<br />
												)}
											</a>
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
			<div className="flex ml8 ">
				<div className="w-100 ">
					<div className="">
						<h2>{props.signupText}</h2>
					</div>
					<div className="bg-white br-pill w-50 pa3 flex justify-between">
						<input
							type="text"
							style={{ outline: "none" }}
							className="ml5 ba b--near-white w-75"
							placeholder={`${props.placeHolder}`}
						/>
						<div className="flex flex-column justify-center">
							<span className="mt2">
								<FiArrowRight size={25} />
							</span>
						</div>
					</div>
				</div>
				<div className="flex w-50  items-end flex-column mr7">
					<div>
						<h2>{props.connectText}</h2>
					</div>

					<div>
						{props.socialmediaImage?.map((image, index) => {
							return (
								<a href={`${image.href}`} key={index} className="ml4">
									<img src={`${image.carouselImage}`} height={40} width={40} />
								</a>
							);
						})}
					</div>
					<div className=" flex mt4">
						{props.menu4?.map((menu, index) => {
							return (
								<a
									className="black-80 no-underline f7-l ml4"
									key={index}
									href={`${menu.href}`}
								>
									{menu.label}
								</a>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
FooterDesktop.schema = {
	title: "custom-desktop-footer",
	type: "object",
	properties: {
		menuLayout: {
			title: "Menu Layout",
			type: "array",
			items: {
				type: "object",
				properties: {
					__editorItemTitle: {
						title: "Menu Display Name",
						type: "string",
					},
					menuHeader: {
						type: "string",
						title: "Enter  menu Header",
					},
					menuItems: {
						type: "array",
						title: "List of sub menu",
						items: {
							type: "object",
							properties: {
								__editorItemTitle: {
									title: "Menu Display Name",
									type: "string",
								},
								label: {
									type: "string",
									title: "Enter Label",
								},
								href: {
									type: "string",
									title: "Enter URL",
								},
							},
						},
					},
				},
			},
		},
		signupText: {
			type: "string",
			title: "Enter signupText",
		},
		connectText: {
			type: "string",
			title: "Enter connectText",
		},

		fbLink: {
			type: "string",
			title: "Enter fb link",
		},
		instaLink: {
			type: "string",
			title: "Enter instagram Link",
		},
		placeHolder: {
			type: "string",
			title: "Enter placeholderText",
		},
		menu4: {
			title: "Bottom row menu",
			type: "array",
			items: {
				type: "object",
				properties: {
					label: {
						type: "string",
						title: "Enter the label",
					},
					href: {
						type: "string",
						title: "Enter href value",
					},
				},
			},
		},
		socialmediaImage: {
			type: "array",
			title: "Image links",
			items: {
				type: "object",
				properties: {
					carouselImage: {
						title: "Social Icons Image",
						type: "string",
						widget: {
							"ui:widget": "image-uploader",
						},
					},
					href: {
						type: "string",
						title: "Enter URL",
					},
				},
			},
		},
	},
};
export default FooterDesktop;
