import { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox } from "@mui/material";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
export default function App() {
	var [records, set_records] = useState();
	var [is_checkbox_active, set_is_checkbox_active] = useEffect(false);
	async function new_record() {}
	async function fetch_records() {
		return (
			await axios({
				baseURL: "http://localhost:4000",
				url: "records",
				method: "get",
			})
		).data;
	}
	async function get_data() {
		set_records(await fetch_records());
	}
	async function new_record() {
		var { inserted_id } = (
			await axios({
				baseURL: "http://localhost:4000",
				url: "records",
				method: "post",
				data: {
					name: document.getElementById("name_input").value,
					privacy_mode: is_checkbox_active,
					time: new Date().getTime(),
				},
			})
		)
			.data(await fetch_records())
			.sort((i1, i2) => i2.time - i1.time)
			.forEach((record, index) => {
				if (record._id === inserted_id) {
					alert(`you must read these pages ${index * +1} - ${index * 5 + 5}`);
				}
			});
		get_data();
	}

	useEffect(() => {
		get_data();
	}, []);
	if (records === undefined) return <h1>loading ...</h1>;
	return (
		<div>
			<h1>khatm quran</h1>
			<h1>your name : </h1>
			<input id="name_input" />
			<div onClick={() => set_is_checkbox_active((prev) => !prev)}>
				{is_checkbox_active ? <Checkbox /> : <CheckBoxOutlineBlankOutlinedIcon />}
				keep my name hidden from others
			</div>
			<button onClick={new_record}>get 5 pages</button>

			<h1>current records</h1>
			{records
				.sort((i1, i2) => i2.time - i1.time)
				.map((record, index, array) => {
					return (
						<div className="bg-blue-600">
							{record.privacy_mode ? "unknown" : record.name}
							{`pages : ${index * 5 + 1} - ${index * 5 + 5}`}
						</div>
					);
				})}
		</div>
	);
}
