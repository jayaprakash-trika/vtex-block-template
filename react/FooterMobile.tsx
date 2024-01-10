import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

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
	label: string;
	href: string;
};

type menuLayout = {
	menuHeader: string;
	menuItems: menu[];
};
const FooterMobile: StorefrontFunctionComponent<footerProps> = (props) => {
	const [submenuIndex, setSubmenuIndex] = useState(-1);
	return (
		<div className="w-100 bg-light-gray">
			<div className="w-100 ">
				<div className="w-100 ph5">
					{props.menuLayout?.map((menuLayoutItem, index: number) => {
						return (
							<div key={index} className="w-100">
								<div
									className="flex justify-between w-100"
									onClick={() => {
										if (submenuIndex !== index) {
											setSubmenuIndex(index);
										} else {
											setSubmenuIndex(-1);
										}
									}}
								>
									<h2>{menuLayoutItem.menuHeader}</h2>
									<div className="flex flex-column justify-center">
										{submenuIndex === index ? <FaMinus /> : <FaPlus />}
									</div>
								</div>

								{submenuIndex === index &&
									menuLayoutItem.menuItems?.map((menu, subIndex) => {
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
			<div className="w-100 ph5 ">
				<div>
					<h3>{props.signupText}</h3>
				</div>
				<div className="bg-white br-pill w-80 pa3 flex justify-between">
					<input
						type="text"
						style={{ outline: "none" }}
						className="ml5 ba b--near-white w-100"
						placeholder={`${props.placeHolder}`}
					/>
					<div className="flex flex-column justify-center">
						<span className="mt2">
							<FiArrowRight size={25} />
						</span>
					</div>
				</div>
			</div>

			<div className="w-100  ph5 mr7">
				<div>
					<h2>{props.connectText}</h2>
				</div>

				<div>
					{props.socialmediaImage?.map((image, index) => {
						return (
							<a href={`${image.href}`} key={index} className="ml4">
								<img
									src={`${image.carouselImage}`}
									alt=" image"
									height={20}
									width={20}
								/>
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
	);
};
FooterMobile.schema = {
	title: "custom-mobile-footer",
	type: "object",
	properties: {
		menuLayout: {
			title: "Menu Layout",
			type: "array",
			items: {
				type: "object",
				properties: {
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

export default FooterMobile;
