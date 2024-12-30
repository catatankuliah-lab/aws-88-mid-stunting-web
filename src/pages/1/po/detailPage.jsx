import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Swal from 'sweetalert2';

const DetailPage = ({ handlePageChanges, detailId, alokasiInit, selectedKantorInit, handleBackClick }) => {
    const inputRef = useRef(null);

    // Data dari localstorage
    const token = localStorage.getItem('token');

    const [alokasiOption, setAlokasiOption] = useState([]);
    const [selectedAlokasi, setSelectedAlokasi] = useState(null)

    const [po, setPO] = useState([]);

    const fetchPO = async () => {
        if (!token) {
            navigate('/');
        }
        try {
            const response = await axios.get(`http://localhost:3089/api/v1/po/${detailId}`, {
                headers: {
                    Authorization: token
                }
            });
            console.log(response.data.data);
            setPO(response.data.data);
        } catch (error) {
            console.log(error);
            setPO([]);
        }
    };

    useEffect(() => {
        fetchPO();
    }, [token, detailId]);

    // const fetchItemLO = async () => {
    //     if (!token) {
    //         navigate('/');
    //     }
    //     let link = "januari";
    //     if (selectedAlokasi == null) {
    //         link = "januari";
    //     } else if (selectedAlokasi.value == 1) {
    //         link = "januari";
    //     } else {
    //         link = "februari";
    //     }
    //     try {
    //         const response = await axios.get(`http://localhost:3089/api/v1/${link}-item-lo/lo/${detailId}`, {
    //             headers: {
    //                 Authorization: token
    //             }
    //         });
    //         if (response.data.data.length != 0) {
    //             const datafetch = response.data.data.map(dataitem => ({
    //                 id_item_lo: dataitem.id_item_lo,
    //                 id_lo: dataitem.id_lo,
    //                 id_alokasi: dataitem.id_alokasi,
    //                 id_gudang: dataitem.id_gudang,
    //                 id_dtt: dataitem.id_dtt,
    //                 tanggal_lo: dataitem.tanggal_lo,
    //                 bulan_alokasi: dataitem.bulan_alokasi,
    //                 tahun_alokasi: dataitem.tahun_alokasi,
    //                 nama_gudang: dataitem.nama_gudang,
    //                 kode_lo: dataitem.kode_lo,
    //                 nama_desa_kelurahan: dataitem.nama_desa_kelurahan,
    //                 nama_kecamatan: dataitem.nama_kecamatan,
    //                 nama_kabupaten_kota: dataitem.nama_kabupaten_kota,
    //                 nama_provinsi: dataitem.nama_provinsi,
    //                 tonase: dataitem.tonase,
    //                 nomor_lo: dataitem.nomor_lo
    //             }));
    //             setIetmLO(datafetch);
    //         } else {
    //             setIetmLO([]);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         setIetmLO([]);
    //     }
    // };

    // useEffect(() => {
    //     fetchItemLO();
    // }, [token, detailId]);

    useEffect(() => {
        const fetchAlokasi = async () => {
            if (!token) {
                navigate('/');
            }
            try {
                const response = await axios.get('http://localhost:3089/api/v1/alokasi', {
                    headers: {
                        Authorization: token
                    }
                });
                if (response.data.data.length != 0) {
                    const datafetch = response.data.data.map(dataitem => ({
                        value: dataitem.id_alokasi,
                        label: dataitem.bulan_alokasi + " " + dataitem.tahun_alokasi
                    }));
                    setAlokasiOption(datafetch);
                } else {
                    setAlokasiOption([]);
                }
            } catch (error) {
                console.log(error);
                setAlokasiOption([]);
            }
        };
        fetchAlokasi();
    }, [token]);

    useEffect(() => {
        if (alokasiOption.length > 0 && alokasiInit) {
            const initialValue = alokasiOption.find(option => option.value === alokasiInit) || null;
            setSelectedAlokasi(initialValue);
        }
    }, [alokasiOption, alokasiInit]);

    const handleAlokasiChange = (selectedOption) => {
        setSelectedAlokasi(selectedOption);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);
        return `${day}/${month}/${year}`;
    };

    // const formattedDate = lo?.tanggal_lo ? new Date(lo.tanggal_lo).toISOString().split("T")[0] : "";

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="mb-3">
                    <div className="divider text-start fw-bold">
                        <div className="divider-text">
                            <span className="menu-header-text fs-6">Detail Loading Order</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="">
                    Klik <button className="fw-bold btn btn-link p-0" onClick={() => handleBackClick()}>disini</button> untuk kembali ke menu utama Loading Order.
                </div>
            </div>
            <div className="col-md-12 mt-3">
                <div className="row">
                    <div className="col-lg-12 mt-2">
                        <div className="mb-3">
                            <div className="divider text-start">
                                <div className="divider-text">
                                    <span className="menu-header-text fs-6">Informasi Loading Order</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12 mb-3">
                        <label htmlFor="nama_kantor" className="form-label">Kantor Cabang</label>
                        <input className="form-control" type="text" id="nama_kantor" name='nama_kantor' placeholder="Kantor Cabang" value={nama_kantor} required readOnly />
                    </div>
                    <div className="col-md-3 col-sm-12 mb-3">
                        <label htmlFor="nama_gudang" className="form-label">Gudang Bulog</label>
                        <input className="form-control" type="text" id="nama_gudang" name='nama_gudang' placeholder="Kantor Cabang" value={nama_gudang} required readOnly />
                    </div>
                    <div className="col-md-3 col-sm-12 col-sm-12 mb-3">
                        <label htmlFor="id_alokasi" className="form-label">Alokasi</label>
                        <Select
                            id="id_alokasi"
                            name="id_alokasi"
                            value={selectedAlokasi}
                            onChange={handleAlokasiChange}
                            options={alokasiOption}
                            placeholder="Pilih Alokasi"
                            required
                        />
                    </div>
                    <div className="col-md-3 col-sm-12 mb-3">
                        <label htmlFor="nomor_lo" className="form-label">Nomor LO</label>
                        <input className="form-control" type="text" id="nomor_lo" name='nomor_lo' placeholder="Nomor LO" value={lo?.nomor_lo} onChange={handleChange} required readOnly />
                    </div>
                    <div className="col-md-3 col-sm-12 mb-3">
                        <label htmlFor="tanggal_lo" className="form-label">Tanggal LO</label>
                        <input className="form-control text-uppercase" type="date" id="tanggal_lo" name='tanggal_lo' ref={inputRef} defaultValue={formattedDate} placeholder="Tanggal Rencana Salur" onChange={handleChange} required />
                    </div>
                    <div className="col-md-3 col-sm-12 mb-3">
                        <label htmlFor="nomor_so" className="form-label">Nomor SO</label>
                        <input className="form-control" type="text" id="nomor_so" name='nomor_so' placeholder="Lokasi Terakhir" ref={inputRef} defaultValue={lo?.nomor_so || ""} onChange={handleChange} />
                    </div>
                    <div className="col-md-3 col-sm-12 col-sm-12 mb-3">
                        <label htmlFor="id_do" className="form-label">Nomor DO</label>
                        <Select
                            id="id_do"
                            name="id_do"
                            value={selectedDO}
                            onChange={handleDOChange}
                            options={doOption}
                            placeholder="Pilih Nomor DO"
                        />
                    </div>
                    <div className="col-md-3 col-sm-12 mb-3">
                        <label htmlFor="nama_driver" className="form-label">Nama Driver</label>
                        <input className="form-control" type="text" id="nama_driver" name='nama_driver' placeholder="Nama Driver" ref={inputRef} defaultValue={lo?.nama_driver || ""} onChange={handleChange} required />
                    </div>
                    <div className="col-md-3 col-sm-12 mb-3">
                        <label htmlFor="telpon_driver" className="form-label">Telpon Driver</label>
                        <input className="form-control" type="text" id="telpon_driver" name='telpon_driver' placeholder="Telpon Driver" ref={inputRef} defaultValue={lo?.telpon_driver || ""} onChange={handleChange} required />
                    </div>
                    <div className="col-md-3 col-sm-12 mb-3">
                        <label htmlFor="nopol" className="form-label">Nopol Mobil</label>
                        <input className="form-control" type="text" id="nopol" name='nopol' placeholder="E 88 LOG" ref={inputRef} defaultValue={lo?.nopol || ""} onChange={handleChange} required />
                    </div>
                    <div className="col-md-3 col-sm-12 mb-3">
                        <label htmlFor="pic" className="form-label">Nama PIC</label>
                        <input className="form-control" type="text" id="pic" name='pic' placeholder="Nama PIC" ref={inputRef} defaultValue={lo?.pic || ""} onChange={handleChange} required />
                    </div>
                    <div className="col-md-3 col-sm-12 mb-3">
                        <label htmlFor="checker" className="form-label">Nama Checker</label>
                        <input className="form-control" type="text" id="checker" name='checker' placeholder="Nama Checker" ref={inputRef} defaultValue={lo?.checker || ""} onChange={handleChange} required />
                    </div>
                    <div className="col-md-3 col-sm-12 mb-3">
                        <label htmlFor="file_do" className="form-label">File Loading Order</label>
                        <input className="form-control" type="file" id="file_do" name='file_do' placeholder="File Loading Order" onChange={(e) => handleFileChange(e, setFile)} required />
                    </div>
                    <div className="col-lg-12 mt-2">
                        <div className="mb-3">
                            <div className="divider text-start">
                                <div className="divider-text">
                                    <span className="menu-header-text fs-6">Informasi Item Loading Order</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 mt-2">
                        <div className="mb-3">
                            <div className="divider text-start">
                                <div className="divider-text">
                                    <span className="menu-header-text fs-6">Item Rencana Salur</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 mb-4 mb-md-0">
                        <div className="table-responsive text-nowrap">
                            <table className="table" style={{ fontSize: "13px" }}>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Tanggal</th>
                                        <th>Provinsi</th>
                                        <th>Kabupaten/Kota</th>
                                        <th>Kecamatan</th>
                                        <th>Desa/Kelurahan</th>
                                        <th>Jumlah KPM</th>
                                        <th>Jumlah Kg</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(groupedData).map((tanggal, index) => (
                                        <React.Fragment key={index}>
                                            {groupedData[tanggal].items.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td>{idx + 1}</td>
                                                    <td>{formatDate(item.tanggal_lo)}</td>
                                                    <td>{item.nama_provinsi}</td>
                                                    <td>{item.nama_kabupaten_kota}</td>
                                                    <td>{item.nama_kecamatan}</td>
                                                    <td>{item.nama_desa_kelurahan}</td>
                                                    <td style={{ textAlign: 'right' }}>{(parseInt(item.tonase) / 10).toLocaleString('id-ID')}</td>
                                                    <td style={{ textAlign: 'right' }}>
                                                        {(parseInt(item.tonase)).toLocaleString('id-ID')} Kg
                                                    </td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                    {/* Total keseluruhan */}
                                    {ietmLO.length > 0 && (
                                        <tr>
                                            <td colSpan="6" className="text-start fw-bold">
                                                Total Keseluruhan
                                            </td>
                                            <td className="fw-bold" style={{ textAlign: 'right' }}>{(totalOverall / 10).toLocaleString('id-ID')}</td>
                                            <td className="fw-bold" style={{ textAlign: 'right' }}>
                                                {(totalOverall).toLocaleString('id-ID')} Kg
                                            </td>
                                            <td colSpan="3"></td>
                                        </tr>
                                    )}
                                    {ietmLO.length === 0 && (
                                        <tr>
                                            <td colSpan="10" className="text-center">
                                                Tidak ada data tersedia.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12 mb-3 mt-3">
                        <label htmlFor="" className="form-label">Proses</label>
                        <button type="button" onClick={downlaodPDFLO} className="btn btn-primary w-100">DOWNLOAD PDF</button>
                    </div>
                </div>
            </div>
        </div >
    );
};

DetailPage.propTypes = {
    handlePageChanges: PropTypes.func.isRequired,
    detailId: PropTypes.number.isRequired,
    alokasiInit: PropTypes.number.isRequired,
    selectedKantorInit: PropTypes.number.isRequired,
    handleBackClick: PropTypes.func.isRequired,
};

export default DetailPage;