import { useEffect, useState } from "react";
import axios from "axios";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import { CheckBox, Person2Rounded } from "@mui/icons-material";
import "./tailwind_output.css";
import image1 from "./image.jpg";
import "./styles.css";
export default function App() {
	if (window.localStorage.getItem("records") === null) {
		window.localStorage.setItem("records", JSON.stringify([]));
	}
	var [records, set_records] = useState();
	var [is_checkbox_active, set_is_checkbox_active] = useState(false);
	async function new_record() {}
	async function fetch_records() {
		return (
			await axios({
				baseURL: vite_api_endpoint /* vite will replace it during build  */,
				url: "records",
			})
		).data;
	}
	async function get_data() {
		set_records(await fetch_records());
	}
	async function change_record_is_read(record_id, new_state) {
		if (!JSON.parse(window.localStorage.getItem("records")).includes(record_id)) {
			alert("این بخش انتخاب شما نبوده است");
			return;
		}
		//new_state must be a boolean
		//record_id must be a string
		if (
			(
				await axios({
					baseURL: vite_api_endpoint,
					url: "new_is_read_state",
					data: {
						new_is_read_state: new_state,
						record_id,
					},
					method: "post",
				})
			).data === "ok"
		) {
			get_data();
		}
	}
	async function new_record() {
		var tmp = (
			await axios({
				baseURL: vite_api_endpoint /* vite will replace it during build  */,
				url: "records",
				method: "post",
				data: {
					name: document.getElementById("name_input").value,
					privacy_mode: is_checkbox_active,
					time: new Date().getTime(),
				},
			})
		).data;
		if (tmp === "limit_reached") {
			alert(
				"متاسفانه این دوره از ختم به پایان رسیده است . ان شاء الله در دوره بعدی مشارکت بفرمایید"
			);
		} else {
			var insertedId = tmp;

			var current_saved_records = JSON.parse(window.localStorage.getItem("records"));
			current_saved_records.push(insertedId);
			window.localStorage.setItem("records", JSON.stringify(current_saved_records));
		}
		var tmp = await fetch_records();
		tmp.sort((i1, i2) => i1.time - i2.time).forEach((record, index) => {
			if (record._id === insertedId) {
				/* alert(`لطفا جز ${index + 1} را قرائت فرمایید. التماس دعا`); */
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
			<div
				className="w-full h-1/3 top-0 left-0 landscape:hidden flex justify-center items-center"
				style={{
					justifyContent: "center",
				}}
			>
				<img src={image1} style={{ height: "33vh" }} />
			</div>
			<div style={{ direction: "rtl" }} className="p-2 relative ">
				<h1 className="text-2xl">دوره ختم قرآن دسته جمعی به نیت حاج شکر الله یاقوت پور</h1>
				<p className="mt-2">لطفا نام و نام خانوادگی خود را وارد کنید :</p>
				<input id="name_input" className="border px-1 my-2 border-blue-500 rounded " />
				<div onClick={() => set_is_checkbox_active((prev) => !prev)}>
					{is_checkbox_active ? <CheckBox /> : <CheckBoxOutlineBlankOutlinedIcon />}
					نام من را به صورت عمومی نشان نده
				</div>
				<button
					onClick={new_record}
					className=" px-2 mt-2 bg-green-500 text-white hover:bg-green-600 duration-300 pushable"
				>
					<span className="front">اعلام جزء شما</span>
				</button>
				<h1>جزء های انتخاب شده تاکنون :‌ {records.length} صفحه </h1>
				<h1>تعداد جزء باقی مانده باقی مانده : {30 - records.length} جزء </h1>
				<div className="flex justify-between mt-2">
					<h1 className="text-xl inline-block">جزء های انتخاب شده</h1>
					<span>(لطفا پس از قرائت ثبت فرمایید)</span>
				</div>

				{records
					.sort((i1, i2) => i1.time - i2.time)
					.map((record, index, array) => {
						return (
							<div
								className="bg-green-600 text-white rounded mb-1 px-1 flex items-center mx-1 justify-between"
								key={record._id}
							>
								<div>
									<Person2Rounded sx={{ color: "white" }} />
									{index + 1} -- {`جزء : ${index + 1} `} --
									<span className="pr-2">
										{record.privacy_mode ? "ناشناس " : record.name}
									</span>
								</div>
								<div
									onClick={() =>
										change_record_is_read(record._id, !record.is_read)
									}
									className="shrink-0"
								>
									<span>قرائت شد</span>{" "}
									{record.is_read ? (
										<CheckBox />
									) : (
										<CheckBoxOutlineBlankOutlinedIcon />
									)}
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}
