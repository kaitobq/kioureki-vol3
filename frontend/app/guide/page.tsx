import Image from "next/image";
import Link from "next/link";
import { TbArrowBackUp } from "react-icons/tb";

const GuidePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-800 to-cyan-500 text-white flex flex-col items-center">
      <Link href="/" className="fixed top-5 left-5">
        <TbArrowBackUp className="size-8 text-white hover:text-blue-600 duration-75" />
      </Link>
      <h2 className="text-3xl font-semibold my-5">ご利用方法</h2>
      <ul className="my-5 underline text-lg *:py-1 hover:*:text-blue-200">
        <li>
          <Link href="#signup">サインアップ</Link>
        </li>
        <li>
          <Link href="#create-org">組織の作成</Link>
        </li>
        <li>
          <Link href="#join-org">組織に参加</Link>
        </li>
        <li>
          <Link href="#database">データベース</Link>
        </li>
        <li>
          <Link href="#edit-data">データの編集</Link>
        </li>
        <li>
          <Link href="#setting">組織の設定</Link>
        </li>
      </ul>
      <div className="bg-white text-black p-10 rounded-md *:my-5 my-10">
        <h5 id="signup" className="font-semibold text-xl">
          サインアップ
        </h5>
        <Image
          src="/lp.png"
          alt="lp"
          width={600}
          height={150}
          priority={false}
          loading="lazy"
        />
        <p>
          ご利用をするにあたって、アカウント作成が必要となります。
          <br />
          トップページの 始める →
          ボタンをクリックしてサインアップページへアクセスしてください。
        </p>
        <Image
          src="/signup.png"
          alt="lp"
          width={600}
          height={150}
          priority={false}
          loading="lazy"
        />
        <p>アカウントの作成後、組織の作成、参加に移ります。</p>
        <h5 id="create-org" className="font-semibold text-xl">
          組織の作成
        </h5>
        <Image
          src="/create-org.png"
          alt="lp"
          width={600}
          height={150}
          priority={false}
          loading="lazy"
        />
        <p>
          新たに組織作成する場合は組織名を入力し、作成ボタンをクリックしてください。
          <br />
          組織の作成後は
          <Link href="database" className="underline">
            データベース
          </Link>
          に進んでください。
        </p>
        <h5 id="join-org" className="font-semibold text-xl">
          組織に参加
        </h5>
        <Image
          src="/join-org.png"
          alt="lp"
          width={600}
          height={150}
          priority={false}
          loading="lazy"
        />
        <p>
          組織に参加する場合は既存のユーザからの招待が必要になります。
          <br />
          招待コードを入力し、参加ボタンをクリックしてください。
        </p>
        <h5 id="database" className="font-semibold text-xl">
          データベース
        </h5>
        <Image
          src="/database.png"
          alt="lp"
          width={600}
          height={150}
          priority={false}
          loading="lazy"
        />
        <p>
          データベースを利用することが可能になりました。
          <br />
          このページでデータを管理することが可能です。
          <br />
          ヘッダーの組織名をクリックすると所属している組織のリストが表示されます。
          <br />
          クリックすることで切り替えることが可能です。
          <br />
          データを追加するには右上の追加ボタンをクリックしてください。
        </p>
        <Image
          src="/add-data.png"
          alt="lp"
          width={600}
          height={150}
          priority={false}
          loading="lazy"
        />
        <p>
          追加ボタンを押すことで、データを追加するダイアログが表示されます。
          <br />
          各項目を入力し、保存ボタンをクリックしてデータを追加することができます。
          <br />
          名前、受傷箇所、受傷日は必須項目となります。
        </p>
        <Image
          src="/added-data.png"
          alt="lp"
          width={600}
          height={150}
          priority={false}
          loading="lazy"
        />
        <p>
          保存ボタンをクリック後、データベースが更新されます。
          <br />
          各項目は項目名をクリックし、ソートすることが可能です。
          <br />
          既にあるデータを更新、削除したい場合、そのデータをクリックしてください。
        </p>
        <h5 id="edit-data" className="font-semibold text-xl">
          データの編集
        </h5>
        <Image
          src="/edit-data.png"
          alt="lp"
          width={600}
          height={150}
          priority={false}
          loading="lazy"
        />
        <p>
          各データをクリックすることで、そのデータの詳細を見ることができます。
          <br />
          右上のボタンを利用してデータの編集、削除が可能です。
          <br />
          データベースに戻りたいときは、左上の矢印ボタンをクリックしてください。
        </p>
        <h5 id="setting" className="font-semibold text-xl">
          組織の設定
        </h5>
        <Image
          src="/setting.png"
          alt="lp"
          width={600}
          height={150}
          priority={false}
          loading="lazy"
        />
        <p>
          ヘッダーのsettingをクリックすることで組織の設定画面に移動できます。
          <br />
          ここでは、ユーザの招待、組織の新規作成ができます。
          <br />
          ユーザを招待したい場合は招待コードの欄にある作成ボタンをクリックしてください。
          <br />
          生成された招待コードをコピーし、参加するユーザに共有してください。
          <br />
          参加するユーザは、
          <Link href="#join-org" className="underline">
            組織に参加
          </Link>
          の手順に従って参加することができます。
        </p>
      </div>
    </div>
  );
};

export default GuidePage;
