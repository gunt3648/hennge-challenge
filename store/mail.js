
export const state = {
	mails: [],
	dateRange: {}
};

export const getters = {
	mailList: state => state.mails,
	dateRange: state => state.dateRange
};

export const mutations = {
	saveMails(state, data) {
		state.mails = data;
	},
	sortMails(state, isAsc) {
		if (isAsc) state.mails.sort(compareDate);
		else state.mails.sort(compareDate).reverse();
	},
	saveDate(state, data) {
		state.dateRange = data;
	}
};

export const actions = {
	fetch({ commit, state }) {
		return createPromise(_ => {
			const dummyMails = [
				{
					key: "V7MFSM5lfT",
					subject: "dummy mail 1",
					from: "aaa@example.com",
					to: ["zzz.zzz@example.com"],
					date: new Date(2020, 1, 1, 0, 20),
					content:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					attach: [],
				},
				{
					key: "HVAjkyYUul",
					subject: "[dummy] this is a dummy mail. please do not reply",
					from: "bbb.bbbb@example.com",
					to: ["yyy.yyy@example.com", "xx@example.com"],
					date: new Date(2020, 1, 1, 0, 10),
					content:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					attach: ["data.csv", "data2.zip"],
				},
				{
					key: "9ApCB9Ypui",
					subject: "[web:333] abcdefghijklmnopqrstuvwxyz",
					from: "aaa@example.com",
					to: ["zzz.zzz@example.com"],
					date: new Date(2019, 12, 31, 10, 20),
					content: "hello world!",
					attach: [],
				},
				{
					key: "Jdh1dI5JPp",
					subject: "dummy mail 100",
					from: "aaa@example.com",
					to: ["zzz.zzz@example.com"],
					date: new Date(2019, 12, 31, 20, 20),
					content: "demo mail",
					attach: ["test.txt"],
				},
			];
			
			if(state.dateRange.start && state.dateRange.end) commit("saveMails", dummyMails.filter(mail => (mail.date >= state.dateRange.start && mail.date <= state.dateRange.end)));
			else commit("saveMails", dummyMails);
		});
	},
	sort({ commit }, isAsc) {
		return createPromise(_ => commit("sortMails", isAsc));
	},
	setDate({ commit }, data) {
		return createPromise(_ => commit("saveDate", data));
	}
}

const createPromise = fn => {
	return new Promise((resolve, reject) => {
		try {
			fn();
			resolve();
		} catch (err) {
			console.error(err);
			reject();
		}
	})
};

const compareDate = (a, b) => {
	if (a.date > b.date) return 1;
	if (b.date > a.date) return -1;
	return 0;
};