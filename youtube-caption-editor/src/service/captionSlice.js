import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
	// Getting Saved state from Local Storage
	const savedData=JSON.parse(localStorage.getItem("captionData"))?.captionList;
	if (savedData) return savedData;
	return {
		/*   Format of Subtitles data
			[id]: {
				[language]: {
					meta: {
						Kind: 'captions',
						Language: 'en'
					},
					cues: [{
						end: '',
						identifier: '',
						start: '',
						text: '',
						styles: ''
					}],
					valid: true
				}
			}
			*/
	};

	// const savedData = JSON.parse(localStorage.getItem("captionData"))?.budgetList;
	// if (savedData && savedData.length > 0) return savedData;
};

const captionListSlice = createSlice({
	name: "captions",
	initialState: getInitialState(),
	reducers: {
		addCaptionDetail(state, action) {
			return {
				...state,
				[action.payload.videoId]: {
					...state[action.payload.videoId],
					[action.payload.language]: {
						...action.payload.data,
					},
				},
			};
		},
		updateCaptionDetail(state, action) {
			return {
				...state,
				[action.payload.videoId]: {
					...state[action.payload.videoId],
					[action.payload.language]: {
						...state[action.payload.videoId][action.payload.language],
						cues: state[action.payload.videoId][action.payload.language].cues.map(
							(cue,idx) => {
								if (cue.identifier === action.payload.captionId) {
									return {
										...cue,
										start: action.payload.start,
										end: action.payload.end,
                                        text: action.payload?.text ? action.payload.text : cue.text,
									};
								}
								return cue;
							}
						).sort((a,b)=>a.end-b.end).map((cue,idx) => ({...cue,identifier:idx})), //Updating Caption and then sorting and maping with new idenifier
					},
				},
			};
		},
		deleteCaptionDetail(state, action) {
			return {
				...state,
				[action.payload.videoId]: {
					...state[action.payload.videoId],
					[action.payload.language]: {
						...state[action.payload.videoId][action.payload.language],
						cues: state[action.payload.videoId][action.payload.language].cues.filter(
							(cue) => cue.identifier !== action.payload.captionId
						).map((cue,idx)=>({...cue,identifier:idx})),
					},
				},
			};
		},
	},
});

export const { addCaptionDetail, updateCaptionDetail, deleteCaptionDetail } =
	captionListSlice.actions;
export default captionListSlice.reducer;
