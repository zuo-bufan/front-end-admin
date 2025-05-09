/* 
* @Author: zkz    
* @CreateTime: 2025-02-11 10:08:53
*/
import instance from '@/http/index.js';

/**
 * 绑定文件和用户
 * @param {*} name 
 * @param {*} url 
 * @returns 
 */
export const bindFileAndUser = (name, url) => {
	return instance({
		url: '/file/bindFileAndUser',
		method: 'POST',
		data: {
			name,
			url
		}
	});
};
/**
 *  更新下载次数
 * @param {*} number 
 * @param {*} id 
 * @returns 
 */
export const updateDownloadFileNumber = (download_number, id) => {
	return instance({
		url: '/file/updateDownloadFileNumber',
		method: 'POST',
		data: {
			download_number,
			id
		}
	});
};
/**
 *  下载文件
 * @param {*} id 
 * @returns 
 */
export const downloadFile = (id) => {
	return instance({
		url: '/file/downloadFile',
		method: 'POST',
		data: {
			id
		}
	});
};
/**
 *  获取文件列表
 * @returns []
 */
export const getFileList = () => {
	return instance({
		url: '/file/getFileList',
		method: 'POST'
	});
};
/**
 *  搜索文件
 * @param {*} file_name 
 * @returns 
 */
export const searchFile = (file_name) => {
	return instance({
		url: '/file/searchFile',
		method: 'POST',
		data: {
			file_name
		}
	});
};
/**
 *  删除文件
 * @param {*} id 
 * @returns []
 */
export const deleteFile = (id) => {
	return instance({
		url: '/file/deleteFile',
		method: 'POST',
		data: {
			id
		}
	});
};
/**
 * 获取文件列表长度
 * @returns length
 */
export const getFileListLength = () => {
	return instance({
		url: '/file/getFileListLength',
		method: 'POST'
	});
};
/**
 * 获取监听换页列表数据接口
 * @param {*} pager 
 * @returns 
 */
export const returnFileListData = (pager) => {
	return instance({
		url: '/file/returnFileListData',
		method: 'POST',
		data: {
			pager
		}
	});
};
