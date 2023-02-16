import { useEffect, useState } from "react";
import axios from "axios";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import { CheckBox, Person2Rounded } from "@mui/icons-material";
import "./tailwind_output.css";
import image1 from "./1.jpg";
//
export default function App() {
	var [records, set_records] = useState();
	var [is_checkbox_active, set_is_checkbox_active] = useState(false);
	async function new_record() {}
	async function fetch_records() {
		return (
			await axios({
				baseURL: "http://localhost:4118",
				url: "records",
				method: "get",
			})
		).data;
	}
	async function get_data() {
		set_records(await fetch_records());
	}
	async function new_record() {
		var insertedId = (
			await axios({
				baseURL: "http://localhost:4118",
				url: "records",
				method: "post",
				data: {
					name: document.getElementById("name_input").value,
					privacy_mode: is_checkbox_active,
					time: new Date().getTime(),
				},
			})
		).data;
		var tmp = await fetch_records();
		tmp.sort((i1, i2) => i1.time - i2.time).forEach((record, index) => {
			if (record._id === insertedId) {
				alert(
					`لطفا صفحات  اعلام شده را قرائت فرمایید: ${index * 5 + 1} - ${
						index * 5 + 5
					} التماس دعا`
				);
			}
		});
		get_data();
	}

	useEffect(() => {
		get_data();
	}, []);
	if (records === undefined) return <h1>loading ...</h1>;
	return (
		<div className="">
			<div className="w-full h-1/3 top-0 left-0 landscape:hidden relative">
				<img
					src={image1}
					className="w-full"
					style={{ objectFit: "fill", height: "33vh" }}
				/>
			</div>
			<div style={{ direction: "rtl" }} className="p-2 relative ">
				<h1 className="text-2xl">ختم قرآن به مناسبت مبعث رسول اکرم (ص)</h1>
				<p className="mt-2">لطفا نام و نام خانوادگی خود را وارد کنید :</p>
				<input id="name_input" className="border px-1 my-2 border-blue-500 rounded " />
				<div onClick={() => set_is_checkbox_active((prev) => !prev)}>
					{is_checkbox_active ? <CheckBox /> : <CheckBoxOutlineBlankOutlinedIcon />}
					نام من را به صورت عمومی نشان نده
				</div>
				<button
					onClick={new_record}
					className="border border-blue-500 rounded px-2 mt-2 bg-green-500 text-white hover:bg-green-600 duration-300"
				>
					اعلام ۵ صفحه شما
				</button>
				<h1>عزیزان حاضر در ختم قرآن:‌ {records.length} نفر</h1>
				<h1>صفحات قرائت شده تا کنون :‌ {records.length * 5} صفحه </h1>
				<h1 className="mt-2 text-2xl">صفحات قرائت شده </h1>
				{records
					.sort((i1, i2) => i1.time - i2.time)
					.map((record, index, array) => {
						return (
							<div
								className="bg-green-600 text-white rounded mb-1 px-1 h-8 flex items-center mx-1"
								key={record._id}
							>
								<Person2Rounded sx={{ color: "white" }} />
								{`صفحات : ${index * 5 + 1} - ${index * 5 + 5}`} --
								<span className="pr-2">
									{record.privacy_mode ? "ناشناس" : record.name}
								</span>
							</div>
						);
					})}
			</div>
		</div>
	);
}
