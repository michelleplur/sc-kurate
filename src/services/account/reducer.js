import * as t from './actionTypes'
import { persistentReducer } from 'redux-pouchdb-plus'

// Service > user

const initialState = {
	status: 'noAccount',
	avatar:
		'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCADMAMwDASIAAhEBAxEB/8QAHQAAAQUBAQEBAAAAAAAAAAAAAQACBQYHAwQICf/EADwQAAEDAwMDAwIDBQYGAwAAAAEAAhEDBAUGITESQVEHImETcTKBsQgUI1KRFUJiY3KhCRYkJZLBQ4LR/8QAHAEAAQUBAQEAAAAAAAAAAAAAAQACAwQFBgcI/8QAMhEAAgICAQMCBAUCBwEAAAAAAAECAwQRBRIhMQZRE0FhcQcUIjJCI4EVFjM0kaGx0f/aAAwDAQACEQMRAD8A+HmpTvCXgpDyt5mCFIykkJHflAawc/dEAwg1pc6GiSrPp/R13kyK1wDTpfOxKfGDm9RGTsjWtyZX7e0uLt/07ek57vAVpw2gbq7b9S+f9H/C4bq8YzA47F0m06FIE/zOElSAAA4iFcrxUu8zPszXLtDsQmO0hiLAD+D1OHclTNO2tqTemnSptj/CE8gBqUthW41qPaKKkpyl5YiA0bcIgeUhESUJjfsnPt2GjhPBSJDfzQ6uCiehxB4hBCa0xSSUHAH2uaCEAfCRBiUkt+RHG4sbSuwtqUGEH/CFBZDQ+LvWl9Jn03nvOysQLiPcnmQ2RwhKEX2aHxslD9rMqy+h8ljyX27TXZ5aOFXKlN9F5p1WlrhyCt1cGv8AaRM9lC5fSmOyrSTTDH9i3bdVZ4a8xLtWW96mZEkpjOaavsNVPUwvpnhwGw+6htyZKpSi4vTL8WpLaCRvKBEhI7hLhNQRHiJS2HKUiZSid5SHiKKUBCRMJb2N0LjdPpU31nhlNpc48AIU6b6rhTYC5xMALRtIaSZZMZe3tOax3AI/CpKqnY9IistjWts5aV0VTpsbeZNoc87hnICudKkym3opgNaOAEWwNgNkmn3HaN1q11xqXYybpux7Y6OJRkcFBxHCGwRIQwDt2RPT42QLtxBSc4xA2RT0weRBpJIHCBaRtKewPcIEkn4Xst8Jk7qDRtHuB+E/e/ApSUVts8B2EBJokiVOt0dnnt6v3J8fZMqaWzlFpLrJ8D4QfjwRfmKt66kQxA4CJJ2AErtcWVzauitRc37heefd0juh0tolTT8CJ3SadoM7JEEECEp6fuhvsLYA6CSUSdphDlFpgbpNBXk43FrQu6RpXFNr2nsVnuqtHusuq9sGl1LlzfH2WjHdCqxlRhY8Ag7FNsojYtMsV2yqkmjCnSCWkEFAb8lXfWGkW0Oq/sGe3l7R2+VSCIMFZVlTrlpmvXONkepB2ATU4mQhHhMRJoX5pwHV25TFYtIYJ2VvRUqN/hUz1fBhOjBzl0obOSgm2TuidMNDRk7tkk/gB8FXlo6SGtGybRpso0xSpsAa0QAng7FbFVarjpGLbY5z6mIgk7HukBGxSj5SiVIQtdthgAT2QifwpGRxwlEcJCa0thHG6lcDp6/1BdttrOiSDy6JAXnxGNq5W8o2dFpLqjwNl9G6J0la6dx9MfTH1nCXOjdJR29mXyXIRwYdv3PwQWl/SfF4ymyrft+rW777f0Ku1thcZatDaVnSEeWD/wDF7oCSdpLwcZdlXXy6pyOQtLUcW9L/AMAg6ys3iHWtL/wC7JIkPUyBymjsJk2OZVtGAnu0Af8ApZTrT0ouMWH3+JH1KQ3LBJIW6JlWk2q0se0Oa4QQUHHfYvYnJX4stp7XsfIlRj6TzTqsLXgwQeyYSAOd1qvqpoVlo92VsaYDT+IALKXiDPhRdGux3OJlV5dasgFpHEbprhHHKBJB25Rg9ynk/wC4O0IEE8JSQfuiBzui0P0MqU6dRhp1my0jcLM9ZabOPrm9tWfwXmT8ErTTLuV58hZUr+0fb1mghwMT5Ve2n4kdEtVrqlv5GIjlKY7KRzuJqYi/qWrmnpBhp8qO6QO6yXFxembEGpLqR1tqD7q4ZQpiXPMALW8BjKWJsKdFjYc4BzvuqZoPEC7vDe1G+2jDmz3K0Zoncdtlo4lel1soZk9voR0CAngBAzCIdJ53VwpC8nhOB9sd0wyTLuE7pLRI7pfQj02LqnnZJBu5hGCkJxNW9FtNC4uH5q4Z1U2yxkjhwK23hU70usGWWmaTWgDrd1/1AVxT14PP+TveRkyb8LsJJJJIoCSSSSEJJJJIRG5/GUsnjK9tUYHTTdE+Y2Xy9ncfUxeTr2VRkOpugr6yIkEFfOvq3jxaanr12iBXcSlJdjovT17VjpfzKOeqR8oE7whMu3T5kbph2CWhdQJ2TOrpSdLTITQT+aKXSHWx3WSQeUeqdigOoGYR6geyAvJWdbYNuQsv3qkya1IbLL3AtJaRuNluVUCoxzHCQRCynUeEq2uVq0qDJZyPzVHLq/mjQw7NLoZfNJ48WGKpU3j3u3JU3s0991ytmdFGmwQAGgf7Lor0Y9MVFFOTcpNjwdo7JdIHCaAUjIKKGjiDMtPCd8phJA5RDiQEmtDdBAg790eojsmEHcnsiN4kpIDXsfUuhgP+XLTb+439ArAoDQ8DTtqP8tv6BT6ceZ5P+tL7iSSSSIRJJJJCEkkkkISwf1uaDmqB/wBU/wBVvCwf1wkZmh89X6pbNngf94vszMydjHKEmISc0kSiG+fEpp3SQ0gkQTsmgETHC6OgCFzmRt2SQUtDhsNzKaNt0ZkeEunaZRSCNJgmQvJd2FtcVfqPaCYXscBHO6YQDyEmk1ocu3cczcQOyQdOyAdzCHHCImx4AG6cYncbFc+scJ3WDyE3Q0RBG8ynCAE07+5LYiUWIcTsflL8oQnuiJO6SB8j6m0Ptpy0/wBDf0CsBnsq9ojbTloP8tv6BXvT2OsarbjK5Ws2lZ2VN9WoXGJ6Wl0T8wqmfnU8djyybn+mJ51HEszc10UrcpPRGUbK7rt6qdB5H2XKrSqUT01GFp+QsQ9Qv297HA5ypjNFYX/o6L+kveGP6h94Wseh/rhpj9oiyuMZStP3TN2tMVC1zh75MCAB8Fcx/mjJoSyMzGcKX/Le9b+bXsdfkeg8iulzqmpTS8Ep1JTvstGZ6X2ViwMzOZt6NV3DXAghMf6bUMY5+XvchSdi6FN9Z9UAgQ0SBPzCc/XnB7ko3b19H3+3uYy9I8t+ndXn/r7lEo2N3XHVSoOcPsuVWnVou6ajC0/IWI+on7ethp/N1cVojDzaW7+gvcGP6o53gd1q3of67aU/aHsrnFfuv7lm7Skax6nCHjgAAD7pq9T5VOr8vGcKX/Le2t+G0bGR6DyKqHZXYpSS8EsDKwb1x3zVv8B36rfbm2fZ3FS1q/jpu6SsC9cd8zQEfzfquxjKM4qUfDOe4KLjm9L8rZmPWN53SDyTHaE2AeOyJdCOjuREzMmUAN5CJIHdNDjAgIiHEGCmEECAU4kRvsuZIAn5SHIcB7TKPCEy37odQGzjukEXwEhPkoNMciU4SRMJCfYW8xCIHTsd0HHdIbGZ2KQB/ZKDMBMLgT3TiSXCCkBoMiSDKRO23dBxIcJ4Q6ttpSEz6o0Q5rNO2gc4T9Nvf4CuGbxORz/phm8ZiA4XTmOeOmZLQx0jZUjRdo+rgrIhx/A39AvpPRmk7inpmnksfSD3lga9sx1AzP8AsuK9dZX5fjelLu2tfddzD9I4n5jmHNP9u2fiVqTE5LD5evZ5O1q0azHkFtRpB/3X1D/w+dMagf6m1M9To1qNjbMpPqPIIa4Bztp4K+yNZ/s9+j+s8s/K6i0fbUrxzpeW2xd1H7q7+n3ppp/Stn/ZWkMDQx1o4RUfTYWF48EFcVzPrb/EeNlhxpanJabetL7e57DCnolvZarLEUckbm7vpql1V3QXbw3tCpnqNiclkdA6j07iq9QV6jS6i2TPS1hkBak22ZaUG0WcNEKu56xuHOF7YEiuxpaQDHUDyCvMU+iUen+LTX9i0j8N9SYjJ4XM3dlk7WrQrNrPkVGkHk+V9MfsC6V1DcepVfN0qFajY29Br6tUtIY5oJkTwvrvWnov6PauyT8nqvR9rSvXGXuZbl/UfvKmNOYTC6YxjtP+n2naGNt3y2pWpMNNzgeZBXpnK+vYZ/HSxoUtTktNvWl769yp+Xab7kZqnJ2Ds/evbcUmh1Uke4L519brilWy1E0ajXfi3BnurD6unI4bUYt6N3UEtJdB7yslz11c3Vdhuarnn5K9Y4S6N/H0zj46V/8ADyKHEyw+SnZKW+7I6dkNuogJpPSYRkTK1DZQjH4il19gIQMedk10g/dLQUkOPu2SLZCA6gJPCDnOjZIOtBbyQuTondOa8ncDZImTMIh1sdOyBdGwTRV6gJSJPIR0FrsP6h07ndAkncJoJJAPCdEiPCGhvYcO3V3RLgDsmB0wTwE4uDjKAmgh5MiESfC5k9JjynF3hIB9T6HrdOn7MzxTb+gX1P6P6xxlfDjF1q7G1mwA0nnZfIXp9ftuNO0HB09IDf6AK74fL3Fhf0K1Cu+n01Gkw4jaVheoeFhzeI6JPTXdP6nHcTytnCcjK5Lab00fY9zaWtY9ZosJ8wF4qtNjJDGho+AuemskzLYK2v2O6hVbK7V+Svm7JrlRZKqXlPR7xTYrq42R8NJkXc91GXHCk7nuoy44VKSJkQ93b0ak9dJp/JQObv7DDWj7i5eykxo8QrFccFYb65X1xVqsx1Cq5oADiGkjstXgOIfN58MPek+7f0Rm8vyK4vFlkPvoxP1QylLUOo6t1bnqY0loI7rLM/TFOs1pG6025xjpJIM+VnWr+ht99Jp3bIK+nMLFhhY8MevxFaPMaMyWXkOb8vuV8u2hKRHlCREIE7RKtGpoLmiNkCd0i75QI6mzKKFoPUACBwg0kmZ7Jhho8yl1OHZEdoc4uI3TfzQFQmQeUt+6S7DkjjZ1m1rWnUbBlo/RdmkzJ4Vc0ZkDc4ttNxl1OZVjaZEJtcuuKkPnHpk0P6uruh1H8PYpvTG4KPwTBTyPpHmemGoNJ4Teosn3cohwAnuhoTQSd90er5TeoOEu4SdAIA7oNA0ab6WavFif7IuqkMcSWknuVsNG6DwHtcCOQQV8tY6o+ne0nsdBDgvofT9es/EWriCSaYS0cnzeFGE1bH5n0z6H67a61GBvau1OG0ySterOa8dTXSDuCF8i6BuatO+6mOLXAzK2fE6/v7Ngo3INZo23PC+bvXk6MLm7K0tJpP8Au/J6t6OjblcRCUntptf2NBueFGXHChzry0rD3MDT4XiutX03gijSBP3XGvJq12Z06x7F8j33tVtNhLiAsH1pQdksrVqVD1EGBPiVqFxlKt0SXuMHss0zNQHIVPuf1Xpf4WSjdn3S14iv/Tzv8RuunCq0/MjLNbV6GAsH1Xj3EEN2WCX97Uv7upcVTu4ytz9a4OKa4DuFgYInmSV7wjlOAhGeP8R+WLpJ24SMcTwgXOncbBMed9nEJJe5vpDwAe6TpA5TIPLSkPLzuiloSQ4D2yeyaXbb90erbpG8pjj7oSDoIgOnwiS0ckJrg0kEGVD5HM0LS5NFztwAhKSitsfGLl4KXo3KmyyLbZ59lchp+FpYLSAWmQVidKo+g8PY4hzTIK1TTmYZksex0+9g6SPsqWFbtfDZbya+/UiX6i0FPa6WiVynbdHhaGino6OPgI9W4HwmfKIM9t0GtC0OAJEJ0AmFxcXA+0oydiCloGtnps4FzTMxDgvqHQ4pV9O2nWAYphfLduWirTO/4gvpn08rdWnbczw0f+0Gcx6mX9GLXuXCycLGqaluIKlqeoLlv4t1BtqGOUfqHysPkfTvGctLry6VJ++u/wDyYOBzvI8YunGtcV7fIs9HUjf/AJGH+q9tLUFo/wDE8N+5VMFX7Jjr6iw9L3gH7rkcv8LuEyNutSg/ozqMT8ReZo/e1NfVGiUsnaVB7a7SqDmLmchU6XSJP6pMuHxLKhH2Khru4IrkEkn5Vz0r6Hh6XybL67XNSWtNFf1B6un6kx4U2VKLi97RSPWJ/wBTDb+QsDG5Plbx6pn6mDJ8ELCAQSd913yLPALpxdfUMnpg8phcOOSiXeJTeoN5CJuJDydo4TDvAKX1JG3KZ1kngJJbD0nQAcJhndAvJEHZIExuQQjockc7iuy2ol7jAaDuspzOUff5CpcdRE7f0Vv1rmhbW37lSd73+Oyz6Z3IWbm27fQi9jV6XUwAgmFMaczD8VetJcTTeQCPChWkjlOHmVSjJwl1IsyimtM2i2uKVxRbWpOlrxIK67PEgrP9J6mFsRYXr/4ZPtcTx8K9sqNcA5hkLbptVsdozbK3XLudepwR6y4SEgHPHS1pcT8KQstO5W9cBQtXkHvCkZDOUILcnoj2yd05rZ458K7430uy130m4BpsPMhXHEekuJtul984Vo5HCbtGbfy2LT/Lf2Mlx2JyF/cMpWtrUcS7npMf1X0doizuMbg6NvdtDXho2BTsZh8XiaYp2VsxgA8BSLaoG0obOY5Xkvz6UFHSR7xUEcpwqeCvCKwjlPFT5QMRwR6y87wVXb5tyLl3sLiXe1TLavynfUB5hEMP0dzpj3VGWrG1j7o3UPlq30rsiY2BUuKo8quakrdF0HeQEB9Eeqwr+t7W5y2HfRth1OG8SsMurK7tKrqdeg9pae7TC+gad0CIJlefIYXD5dnTeWzHT8I70dHgch+SXw5R2j5/JcRCa6dgStWynpXZV+p9hWDPDYVTyXp3mrEEtoue3tsnJo6Cnksa7xLT+pVj0tOyAEAQvRcYq/syRXt3NjyF43B45kFOSL6aktofUPC8OUyFLG2r69V8QPaPJ7Ltc3VO0ouq13gNaJMrNtS6hqZS4NNjiKLNgJ5+VDfcqo/Unpr+IyPyeRq5K8qXNUn3mQPC8nURwE0uE7JdRHZYkm29s0EtdkAGRKMwIlMDuwXW3pmvVFMCSTCI59jtZ2txd1A2g0z/ADeFrPp1TtPrU8fqGv7CQGv6oj7qp4uzp2dBo6R1HlSDapaQ4OghKF0qpbiY+XdK5OMXpe59M4jR+n6FJlWhTFRpAIcTKsNta2ds0NpW7B/9QsH0N6oXGG6LDJuNS3mA7cuC2bGZ2wy1BtezuGPDhMBwkfktSm+NqOJzqMiEv6rbXuT7KoA2EJ7a6jRXPlOFbflTIzXX7kmKw8p4qjso36w8p4rfKIxwRIisPK6Ct8qMbWE7ldG1x5RG9BJCt3ThWKjhcT3Tm1xySgN6ESIrSq5q+r0Mp1Z5MKVbXHlVzW9b/t9JwPD0ibGh/VRF0r3fle2leEb9SqlG9BMyvdSve0prNaWOWileTEFeply1+z2td9wqzRvB3K9tK8+UCrKnRK18XjL4EVramZ79IVW1HoHTFO1qXtxU+gGgmS8gL05nWWMwFq64u7hpcOGNILifssa1h6h5DU9c0mVDTtgdmtJHV91DbkKlfUuYVGVKe65NRKZr6ld3NepSxr5taZIAHJ/NZ49rmO6agII5WniqHCDuDyqnqbENpu/eqLdjys2Vrse5HbYeS+1cytfZHdNlLqjhJGtr2FJA+VOafswSbl7fgKDpgOeAe6t1mBTt2BggQmyekVcubjDS+ZINePKPWPK8ocSndRURl9Oz1B/ypnAary2n6wqWN09rQfcwGA5V7qKf1EIqTi9ojnXGa6ZLaN80t6q43LNZQvyLe4MbSTP5q80b2jWAdSqhwO+xlfJrXvYepriCO4Kt2jdX52yu6VnRuppOMEOEq/Tlt6jMxMriopOdb19D6KFffldBWA7qv4++rXFGm+p0y5oJgfCkG1HTyr6MR1kkKwI2O6cKxUcKjp5XQPd5R2R/CJEVxsujao5BKjmvd5TmvcjsY6yRFbwoHWji7FEj+7JUiHuB2UXqpxOEuT4plL5ElEOm2L+pnNG+P8y99G+OwlVOjXqeVzyGVu7W2fUouaHDgwmt67nTzpUmXh2YoWtM1K9ZrWtEndVLUfqvQtmutsR/EfwXyQQVlGW1FlsnWIurgkAnZuy8DKjjuSs67Lk+0OxZq4yC/VPuT+Qzl9lq5uL+5fVcf5jK5MreCoxj3eV2Y93lUm992XPhqK0iSbW4kpXLGXVB1N+8gwvI17iurHFLYxx09oo+StnWdy+kREFeUKw6qpt6qdSPcRuq6B8qaPdbN6ibsrUj/9k=',
	mnemonic: [],
	wallet: {},
	subscriptions: {},
	posts: {},
}

function accountState(state = initialState, action) {
	switch (action.type) {
		case t.SET_ACCOUNT:
			return {
				...state,
				...action.data,
			}

		case t.RESET_ACCOUNT:
			return {
				...initialState,
			}

		default:
			return state
	}
}

const account = persistentReducer(accountState, {
	name: 'account',
})

export default account
