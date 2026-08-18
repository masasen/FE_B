/opt/homebrew/Library/Homebrew/cmd/shellenv.sh: line 18: /bin/ps: Operation not permitted
/* IPAが公開した科目B問題を、画面表示向けに改行・表記を整えて収録する。
   問題の著作権はIPAに帰属する。各問の source に原典PDFを保持する。 */

const IPA_SOURCES = {
  sample6: {
    label:"基本情報技術者試験 科目Bのサンプル問題（IPA、2022年4月）",
    url:"https://www.ipa.go.jp/shiken/syllabus/ps6vr7000000oett-att/fe_kamoku_b_sample.pdf"
  },
  sample: {
    label:"基本情報技術者試験（科目B試験）サンプル問題セット（IPA、2022年）",
    url:"https://www.ipa.go.jp/shiken/syllabus/henkou/2022/ssf7ph000000h5tb-att/fe_kamoku_b_set_sample_qs.pdf"
  },
  r05: {
    label:"令和5年度 基本情報技術者試験 科目B 公開問題（IPA）",
    url:"https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/t6hhco0000003zx0-att/2023r05_fe_kamoku_b_qs.pdf"
  },
  r06: {
    label:"令和6年度 基本情報技術者試験 科目B 公開問題（IPA）",
    url:"https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/eid2eo0000007g1d-att/2024r06_fe_kamoku_b_qs.pdf"
  },
  r07: {
    label:"令和7年度 基本情報技術者試験 科目B 公開問題（IPA）",
    url:"https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/tbl5kb0000005r9r-att/2025r07_fe_kamoku_b_qs.pdf"
  },
  r08: {
    label:"令和8年度 基本情報技術者試験 科目B 公開問題（IPA）",
    url:"https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/rcu1hd0000012qj6-att/2026r08_fe_kamoku_b_qs.pdf"
  }
};

function officialQuestion(q){
  const steps = q.steps || q.reasoning.map((text, i) => ({
    note:text,
    v:[String(i + 1), text]
  }));
  return {
    vars:q.vars || ["段階","確認内容"],
    code:null,
    given:null,
    ...q,
    steps,
    explain:q.explain || `<p>${q.reasoning[q.reasoning.length - 1]}</p>`,
    official:true
  };
}

const OFFICIAL_QUESTIONS = [
  officialQuestion({
    id:"ipa-sample6-q01", cat:"アルゴリズム", title:"年齢別入場料の条件",
    prompt:"0〜3歳は100円、4〜9歳は300円、10歳以上は500円を返す。最初に age≦3 を判定した後、300円を返すelseif条件はどれか。",
    choices:["age≧4 and age＜9","age=4 or age=9","age＞4 and age≦9","age≧4","age＞4","age≦9","age＜9"], answer:5,
    reasoning:["最初のifが偽の時点でageは4以上と分かっている。","追加で必要なのはage≦9だけ。正解はカ。"], source:IPA_SOURCES.sample6
  }),
  officialQuestion({
    id:"ipa-sample6-q02", cat:"プログラミング", title:"配列を逆順にする添字",
    prompt:"array={1,2,3,4,5} の左右の要素を交換して逆順にする。rightの式aと、tmpを書き戻す代入先bの組合せはどれか。",
    choices:["a=要素数-left, b=array[left]","a=要素数-left, b=array[right]","a=要素数-left+1, b=array[left]","a=要素数-left+1, b=array[right]"], answer:2,
    reasoning:["left=1に対応する右端は要素数-left+1。","right側へleftの値を入れた後、退避値tmpはarray[left]へ戻す。正解はウ。"], source:IPA_SOURCES.sample6
  }),
  officialQuestion({
    id:"ipa-sample6-q03", cat:"データ構造", title:"単方向リスト末尾への追加",
    prompt:"新しい要素currを単方向リスト末尾へ追加する。listHeadの判定aと、末尾要素prev.nextへの代入bの組合せはどれか。",
    choices:["a=未定義, b=curr","a=未定義, b=curr.next","a=未定義, b=listHead","a=未定義でない, b=curr","a=未定義でない, b=curr.next","a=未定義でない, b=listHead"], answer:0,
    reasoning:["空リストはlistHeadが未定義なので、新要素を先頭にする。","空でなければ末尾までたどりprev.nextへcurrを代入する。正解はア。"], source:IPA_SOURCES.sample6
  }),
  officialQuestion({
    id:"ipa-sample6-q04", cat:"プログラミング", title:"疎行列の三配列表現",
    prompt:"行優先で非0要素だけを走査し、行番号列・列番号列・値列へ追加する。行列 {{3,0,0,0,0},{0,2,2,0,0},{0,0,0,1,3},{0,0,0,2,0},{0,0,0,0,1}} の変換結果はどれか。",
    choices:[
      "行={1,2,2,3,3,4,5}, 列={1,2,3,4,5,4,5}, 値={3,2,2,1,2,3,1}",
      "行={1,2,2,3,3,4,5}, 列={1,2,3,4,5,4,5}, 値={3,2,2,1,3,2,1}",
      "行={1,2,3,4,5,4,5}, 列={1,2,2,3,3,4,5}, 値={3,2,2,1,2,3,1}",
      "行={1,2,3,4,5,4,5}, 列={1,2,2,3,3,4,5}, 値={3,2,2,1,3,2,1}"
    ], answer:1,
    reasoning:["非0位置は(1,1),(2,2),(2,3),(3,4),(3,5),(4,4),(5,5)。","値は順に3,2,2,1,3,2,1。正解はイ。"], source:IPA_SOURCES.sample6
  }),
  officialQuestion({
    id:"ipa-sample6-q05", cat:"プログラミング", title:"後続文字の出現割合",
    prompt:"英単語群でc1の直後にc2が現れる割合を求める。単語末尾のc1は分母に含めない。freq(s)は出現回数、freqE(s)はsで終わる単語数を返す。式はどれか。",
    choices:["(freq(s1)-freqE(s1))÷freq(s1+s2)","(freq(s2)-freqE(s2))÷freq(s1+s2)","freq(s1+s2)÷(freq(s1)-freqE(s1))","freq(s1+s2)÷(freq(s2)-freqE(s2))"], answer:2,
    reasoning:["分子は連続文字列s1+s2の出現回数。","分母はs1の全出現から単語末尾のs1を除いた回数。正解はウ。"], source:IPA_SOURCES.sample6
  }),
  officialQuestion({
    id:"ipa-sample6-q06", cat:"セキュリティ", title:"PaaS運用の責任共有",
    prompt:"PaaS上のECサイトで、(一)DBMSの既知脆弱性、(二)アプリサーバOSの既知脆弱性、(三)自社開発ログイン機能の脆弱性に対処する組織はどれか。PaaS提供者はB社、開発運用委託先はC社。",
    choices:["A,A,A","A,A,C","A,B,B","B,B,B","B,B,C","B,C,B","B,C,C","C,B,B","C,B,C","C,C,B"], answer:4,
    reasoning:["PaaS基盤のDBMSとOSは提供者B社が対処する。","自社Webアプリのログイン機能は契約上C社が対処する。B,B,Cで正解はオ。"], source:IPA_SOURCES.sample6
  }),

  officialQuestion({
    id:"ipa-sample-q01", cat:"プログラミング", title:"代入後の変数値",
    prompt:"x=1, y=2, z=3 とし、x←y、y←z、z←x の順に代入した後、yとzを出力する。出力はどれか。",
    code:["x ← 1","y ← 2","z ← 3","x ← y","y ← z","z ← x","y と z を出力する"],
    choices:["1,2","1,3","2,1","2,3","3,1","3,2"], answer:5,
    reasoning:["x←yでx=2、y←zでy=3。","z←xでは更新済みのx=2が入る。","y,z は3,2で、正解はカ。"], source:IPA_SOURCES.sample
  }),
  officialQuestion({
    id:"ipa-sample-q02", cat:"アルゴリズム", title:"FizzBuzzの分岐順",
    prompt:"3だけ、5だけ、3と5の両方、どちらでもない、を正しく判定するif-elseifの条件順はどれか。各選択肢は a,b,c の順を表す。",
    choices:["3 ／ 3と5 ／ 5","3 ／ 5 ／ 3と5","3と5 ／ 3 ／ 5","5 ／ 3 ／ 3と5","5 ／ 3と5 ／ 3"], answer:2,
    reasoning:["3と5の両方で割り切れる場合を先に判定しないと、3だけの分岐に入ってしまう。","最初を3と5、次に3、次に5とする。正解はウ。"], source:IPA_SOURCES.sample
  }),
  officialQuestion({
    id:"ipa-sample-q03", cat:"プログラミング", title:"累積和配列の5番目",
    prompt:"makeNewArray({3,2,1,6,5,4}) は、先頭からの累積和を配列へ追加する。戻り値の5番目はどれか。",
    code:["outの末尾に in[1] を追加","for (i を2から要素数まで)","  tail ← outの末尾","  outの末尾に tail＋in[i] を追加","endfor"],
    choices:["5","6","9","11","12","17","21"], answer:5,
    reasoning:["累積値は3,5,6,12,17,21。","5番目は17で、正解はカ。"], source:IPA_SOURCES.sample
  }),
  officialQuestion({
    id:"ipa-sample-q04", cat:"アルゴリズム", title:"減算による最大公約数",
    prompt:"xとyが等しくなるまで大きい方から小さい方を引いて最大公約数を求める。外側の制御 a、比較 b、終了 c の組合せはどれか。",
    choices:["if(x≠y) ／ x＜y ／ endif","if(x≠y) ／ x＞y ／ endif","while(x≠y) ／ x＜y ／ endwhile","while(x≠y) ／ x＞y ／ endwhile"], answer:3,
    reasoning:["等しくなるまで繰り返すのでwhile(x≠y)。","xが大きいときx←x-yとするため比較はx＞y。正解はエ。"], source:IPA_SOURCES.sample
  }),
  officialQuestion({
    id:"ipa-sample-q05", cat:"プログラミング", title:"平方根をpowで表す",
    prompt:"正の実数x,yについて √(x²+y²) を pow(a,b) だけで表す式はどれか。",
    choices:["(x²+y²)÷√2","(x²+y²)÷xʸ","2^(√x)+2^(√y)","√((2ˣ)ʸ)","pow(pow(x,2)+pow(y,2),0.5)","x²×y²÷xʸ","xʸ÷√2"], answer:4,
    reasoning:["平方根は0.5乗で表せる。","x²+y²の全体を0.5乗する式で、正解はオ。"], source:IPA_SOURCES.sample
  }),
  officialQuestion({
    id:"ipa-sample-q06", cat:"プログラミング", title:"8ビットの並びを反転",
    prompt:"8ビット値の最下位ビットを順に取り出し、逆順の値rを作るループ本体はどれか。",
    choices:["r←(r<<1) OR (rbyte AND 1); rbyte←rbyte>>1","r←(r<<7) OR (rbyte AND 1); rbyte←rbyte>>7","r←(rbyte<<1) OR (rbyte>>7); rbyte←r","r←(rbyte>>1) OR (rbyte<<7); rbyte←r"], answer:0,
    reasoning:["rを左へ1ビットずらし、rbyteの最下位ビットを右端へ加える。","rbyteは右へ1ビットずらして次のビットを準備する。正解はア。"], source:IPA_SOURCES.sample
  }),
  officialQuestion({
    id:"ipa-sample-q07", cat:"アルゴリズム", title:"階乗の再帰式",
    prompt:"n=0なら1を返すfactorialで、n>0のときに返す式はどれか。",
    choices:["(n-1)×factorial(n)","factorial(n-1)","n","n×(n-1)","n×factorial(1)","n×factorial(n-1)"], answer:5,
    reasoning:["n! = n×(n-1)!。","return n×factorial(n-1)で、正解はカ。"], source:IPA_SOURCES.sample
  }),
  officialQuestion({
    id:"ipa-sample-q08", cat:"データ構造", title:"優先度付きキュー",
    prompt:"小さい優先度値ほど先に取り出し、同優先度なら先入れ順とする優先度付きキューを指定のenqueue/dequeue列で操作した後、残りを全て出力する。出力順はどれか。",
    given:"追加 A:1, B:2, C:2, D:3 → 2回取出し → 追加 D:3, B:2 → 2回取出し → 追加 C:2, A:1 → 全て取出し",
    choices:["A,B,C,D","A,B,D,D","A,C,C,D","A,C,D,D"], answer:3,
    reasoning:["前半の取出しでA,B、その後C,Bを取り出す。","最後に残るD,D,CへAを追加するため、優先順はA,C,D,D。正解はエ。"], source:IPA_SOURCES.sample
  }),
  officialQuestion({
    id:"ipa-sample-q09", cat:"データ構造", title:"二分木の通りがけ順",
    prompt:"各節で左部分木、節自身、右部分木の順に再帰する。完全二分木（1の子が2,3、2の子が4,5、…、7の左子が14）をorder(1)でたどる出力順はどれか。",
    choices:["1,2,3,4,5,6,7,8,9,10,11,12,13,14","1,2,4,8,9,5,10,11,3,6,12,13,7,14","8,4,9,2,10,5,11,1,12,6,13,3,14,7","8,9,4,10,11,5,2,12,13,6,14,7,3,1"], answer:2,
    reasoning:["処理は中間順（in-order）走査。","左部分木を全て出力してから根1、続いて右部分木となる。正解はウ。"], source:IPA_SOURCES.sample
  }),
  officialQuestion({
    id:"ipa-sample-q10", cat:"データ構造", title:"単方向リストの要素削除",
    prompt:"単方向リストで、削除位置posの直前をprevが指している。prev.nextに代入してposの要素を飛ばす式はどれか。",
    choices:["listHead","listHead.next","listHead.next.next","prev","prev.next","prev.next.next"], answer:5,
    reasoning:["削除対象はprev.next、その次はprev.next.next。","prev.nextを対象の次へつなぎ替えるので正解はカ。"], source:IPA_SOURCES.sample
  }),
  officialQuestion({
    id:"ipa-sample-q11", cat:"アルゴリズム", title:"ビンソートの入力条件",
    prompt:"要素数nのbinsに bins[data[i]]←data[i] と格納したとき、未定義を残さず昇順になる入力はどれか。",
    choices:["{2,6,3,1,4,5}","{3,1,4,4,5,2}","{4,2,1,5,6,2}","{5,3,4,3,2,6}"], answer:0,
    reasoning:["1からnまでの値が重複なく一度ずつ必要。","アだけが1〜6の置換で、bins={1,2,3,4,5,6}となる。"], source:IPA_SOURCES.sample
  }),
  officialQuestion({
    id:"ipa-sample-q12", cat:"プログラミング", title:"配列の一致率",
    prompt:"同じ長さの二つの文字配列について、同じ要素番号の文字が一致する割合を返す。ループ内のif条件はどれか。",
    choices:["s1[i]≠s2[cnt]","s1[i]≠s2[i]","s1[i]=s2[cnt]","s1[i]=s2[i]"], answer:3,
    reasoning:["比較対象は同じ要素番号i同士。","一致したときcntを増やすためs1[i]=s2[i]。正解はエ。"], source:IPA_SOURCES.sample
  }),
  officialQuestion({
    id:"ipa-sample-q13", cat:"アルゴリズム", title:"二分探索の無限ループ",
    prompt:"二分探索で data[middle]<target のとき low←middle、逆なら high←middle と更新する不具合がある。無限ループになる例はどれか。",
    choices:["1要素でtargetがその値","2要素でtargetが先頭値","2要素でtargetが末尾値","要素に-1を含む"], answer:2,
    reasoning:["2要素ではmiddleが先頭を指す。targetが末尾値ならlow←middleでlowが変化しない。","同じ比較を繰り返すため正解はウ。"], source:IPA_SOURCES.sample
  }),
  officialQuestion({
    id:"ipa-sample-q14", cat:"プログラミング", title:"五数要約の順位計算",
    prompt:"sortedData={0.1,0.2,…,1.0} に対し、i=ceil(p×(n-1))、戻り値sortedData[i+1]で p={0,0.25,0.5,0.75,1} を求める。結果はどれか。",
    choices:["{0.1,0.3,0.5,0.7,1}","{0.1,0.3,0.5,0.8,1}","{0.1,0.3,0.6,0.7,1}","{0.1,0.3,0.6,0.8,1}","{0.1,0.4,0.5,0.7,1}","{0.1,0.4,0.5,0.8,1}","{0.1,0.4,0.6,0.7,1}","{0.1,0.4,0.6,0.8,1}"], answer:7,
    reasoning:["ceil(0,2.25,4.5,6.75,9)は0,3,5,7,9。","添字は1,4,6,8,10となり、{0.1,0.4,0.6,0.8,1}。正解はク。"], source:IPA_SOURCES.sample
  }),
  officialQuestion({
    id:"ipa-sample-q15", cat:"アルゴリズム", title:"三目並べのミニマックス評価",
    prompt:"三目並べの状態木で、自分の手番は子の最大値、相手の手番は子の最小値を採用する。図の枝AとBの評価値の組合せはどれか。葉は勝ち10、負け-10、引分け0。",
    choices:["0,-10","0,0","10,-10","10,0"], answer:0,
    reasoning:["A側は相手が自分に不利な最小値0を選ぶ。","B側は相手が-10を選べるため-10。正解はア。"], source:IPA_SOURCES.sample
  }),
  officialQuestion({
    id:"ipa-sample-q16", cat:"プログラミング", title:"UTF-8の6ビット分割",
    prompt:"3バイトUTF-8を {224,128,128} から作る。末尾バイトから codePoint の下位ビットを加え、同じ値で商を取りながら3回処理する。除数はいくつか。",
    choices:["(4-i)×2","2^(4-i)","2^i","i×2","2","6","16","64","256"], answer:7,
    reasoning:["各継続バイトに格納するデータ部は6ビット。","6ビットずつ分ける除数は2^6=64で、正解はク。"], source:IPA_SOURCES.sample
  }),
  officialQuestion({
    id:"ipa-sample-q17", cat:"セキュリティ", title:"PaaSの責任分界",
    prompt:"PaaS上のECサイトで、(1)アプリサーバOS、(2)WebアプリのXSS、(3)DBMS の脆弱性が指摘された。PaaS事業者B、開発運用委託先Cの担当組合せはどれか。",
    choices:["A,A,A","A,A,C","A,B,B","B,B,B","B,B,C","B,C,B","B,C,C","C,B,B","C,B,C","C,C,B"], answer:5,
    reasoning:["PaaSのOSとDBMSは基盤提供者B社が対処する。","Webアプリの脆弱性は契約上C社が対処する。B,C,Bで正解はカ。"], source:IPA_SOURCES.sample
  }),
  officialQuestion({
    id:"ipa-sample-q18", cat:"セキュリティ", title:"BYODで増加するリスク",
    prompt:"客先常駐者に個人所有PCからのVPN接続を許可する。増加又は新たに生じるリスク二つの最も適切な組合せはどれか。\n(一)VPN増加による可用性低下 (二)会社PC紛失 (三)個人PCがフィッシングで感染 (四)総務部員の私有PC接続 (五)感染個人PCから社内へ拡散",
    choices:["一,二","一,三","一,四","一,五","二,三","二,四","二,五","三,四","三,五","四,五"], answer:3,
    reasoning:["VPN利用者増加による容量不足のリスクが増す。","感染した個人PCを社内へ接続する経路が新たに生じる。正解は(一),(五)のエ。"], source:IPA_SOURCES.sample
  }),
  officialQuestion({
    id:"ipa-sample-q19", cat:"セキュリティ", title:"受注管理の職務分離",
    prompt:"B社担当者が入力し、A社責任者が承認する。A社責任者は全業務を閲覧できる。表のa1（閲覧のみ）とa2（閲覧・入力）の利用者の組合せはどれか。",
    choices:["A社責任者,B社責任者","A社責任者,B社担当者","B社責任者,A社責任者","B社責任者,B社担当者","B社担当者,B社責任者"], answer:3,
    reasoning:["B社責任者は入力結果の閲覧だけを行う。","B社担当者は閲覧と入力を行う。正解はエ。"], source:IPA_SOURCES.sample
  }),
  officialQuestion({
    id:"ipa-sample-q20", cat:"セキュリティ", title:"ファイアウォール運用の職務分離",
    prompt:"同じ担当者がFWルールを編集し、自分でログ確認・承認も行っている。誤変更を防ぐ最も適切な改善策はどれか。",
    choices:["コンソールにEDRを導入","多要素認証を導入","コンソール担当とリモート担当に分ける","担当者を1人に限定","一部をログ確認専任にする","編集担当とログ確認・承認担当に分け最小権限を付与","曜日ごとに担当者を割当て"], answer:5,
    reasoning:["誤変更の防止には編集と承認を別人へ分離する。","それぞれに必要最小限の権限を与えるのが適切で、正解はカ。"], source:IPA_SOURCES.sample
  }),

  officialQuestion({
    id:"ipa-r05-q01", cat:"アルゴリズム", title:"素数列を作る条件",
    prompt:"findPrimeNumbers は、引数 maxNum 以下の全ての素数を配列で返す。外側のループ上限 a と、合成数を検出する条件 b の正しい組合せはどれか。配列の要素番号は1から始まる。",
    code:[
      "○整数型の配列: findPrimeNumbers(整数型: maxNum)",
      "  整数型の配列: pnList ← {}",
      "  for (i を 2 から a まで 1 ずつ増やす)",
      "    divideFlag ← true",
      "    for (j を 2 から iの正の平方根の整数部分 まで 1 ずつ増やす)",
      "      if (b)",
      "        divideFlag ← false",
      "        繰返し処理を終了する",
      "      endif",
      "    endfor",
      "    if (divideFlag が true と等しい)",
      "      pnListの末尾に i を追加する",
      "    endif",
      "  endfor",
      "  return pnList"
    ],
    choices:[
      "a: maxNum ／ b: i ÷ j の余りが0と等しい",
      "a: maxNum ／ b: i ÷ j の商が1と等しくない",
      "a: maxNum＋1 ／ b: i ÷ j の余りが0と等しい",
      "a: maxNum＋1 ／ b: i ÷ j の商が1と等しくない"
    ], answer:0,
    reasoning:["maxNum 以下を調べるので外側の上限は maxNum。","j で割った余りが0なら i は合成数である。","したがって a=maxNum、b=余りが0で、正解はア。"],
    source:IPA_SOURCES.r05
  }),
  officialQuestion({
    id:"ipa-r05-q02", cat:"プログラミング", title:"手続の呼出し順と出力",
    prompt:"proc2 を呼び出したとき、文字列はどの順に出力されるか。",
    code:[
      "○proc1()", "  \"A\" を出力する", "  proc3()",
      "○proc2()", "  proc3()", "  \"B\" を出力する", "  proc1()",
      "○proc3()", "  \"C\" を出力する"
    ],
    choices:["A, B, B, C","A, C","A, C, B, C","B, A, B, C","B, C, B, A","C, B","C, B, A","C, B, A, C"],
    answer:7,
    reasoning:["proc2 は最初に proc3 を呼ぶので C。","次に B を出力し、proc1 が A を出力してから proc3 を呼ぶ。","出力は C, B, A, C で、正解はク。"],
    source:IPA_SOURCES.r05
  }),
  officialQuestion({
    id:"ipa-r05-q03", cat:"アルゴリズム", title:"クイックソートの最初の分割",
    prompt:"大域配列 data={2,1,3,5,4} を sort(1,5) で整列する。最初の分割処理が終わり、配列全体を最初に出力したときの並びはどれか。",
    code:[
      "pivot ← data[(first＋last)÷2 の商]", "i ← first", "j ← last",
      "while (true)", "  while (data[i] ＜ pivot) i ← i＋1 endwhile",
      "  while (pivot ＜ data[j]) j ← j－1 endwhile",
      "  if (i ≧ j) 繰返し処理を終了する endif",
      "  data[i] と data[j] の値を入れ替える", "  i ← i＋1", "  j ← j－1", "endwhile"
    ],
    choices:["1 2 3 4 5","1 2 3 5 4","2 1 3 4 5","2 1 3 5 4"], answer:3,
    reasoning:["pivot は中央要素 data[3]=3。","最初は data[1]=2 と data[5]=4 の位置調整後、i=3、j=3で終了する。","この分割では配列は 2 1 3 5 4 のままで、正解はエ。"],
    source:IPA_SOURCES.r05
  }),
  officialQuestion({
    id:"ipa-r05-q04", cat:"データ構造", title:"二重ハッシュ法による格納",
    prompt:"要素数5、空きを-1で表す hashArray に add(3), add(18), add(11) を順に実行する。第1候補は (value mod 5)+1、衝突時の第2候補は ((value+3) mod 5)+1 とする。終了直後の配列はどれか。",
    choices:["{-1,3,-1,18,11}","{-1,11,-1,3,-1}","{-1,11,-1,18,-1}","{-1,18,-1,3,11}","{-1,18,11,3,-1}"], answer:3,
    reasoning:["3 の第1候補は4なので hashArray[4]=3。","18 も第1候補4で衝突し、第2候補2に入る。","11 の第1候補2は使用済みなので第2候補5に入り、{-1,18,-1,3,11}。正解はエ。"],
    source:IPA_SOURCES.r05
  }),
  officialQuestion({
    id:"ipa-r05-q05", cat:"プログラミング", title:"コサイン類似度の計算",
    prompt:"二つのベクトルのコサイン類似度を計算するプログラムで、分子に加える式 a と、vector2 のノルムを分母へ反映する式 b の組合せはどれか。",
    code:[
      "numerator ← 0", "for (i を 1 から vector1の要素数 まで)", "  numerator ← numerator ＋ a", "endfor",
      "temp ← Σ vector1[i]の2乗", "denominator ← tempの正の平方根", "temp ← 0",
      "temp ← Σ vector2[i]の2乗", "denominator ← b", "similarity ← numerator ÷ denominator"
    ],
    choices:[
      "a: √(v1[i]×v2[i]) ／ b: denominator×√temp","a: √(v1[i]×v2[i]) ／ b: denominator＋√temp","a: √(v1[i]×v2[i]) ／ b: √temp",
      "a: v1[i]×v2[i] ／ b: denominator×√temp","a: v1[i]×v2[i] ／ b: denominator＋√temp","a: v1[i]×v2[i] ／ b: √temp",
      "a: v1[i]² ／ b: denominator×√temp","a: v1[i]² ／ b: denominator＋√temp","a: v1[i]² ／ b: √temp"
    ], answer:3,
    reasoning:["分子は対応要素の積の総和なので vector1[i]×vector2[i]。","分母は二つのノルムの積なので、既存の denominator に √temp を掛ける。","正解はエ。"],
    source:IPA_SOURCES.r05
  }),
  officialQuestion({
    id:"ipa-r05-q06", cat:"セキュリティ", title:"複合機メールの初期設定リスク",
    prompt:"複合機の送信メールが誰でも知り得る初期設定の差出人・件名・本文・添付名を使っている。初期設定から変更すべきと評価した最も適切なリスクはどれか。",
    choices:[
      "攻撃者の偽メールを複合機からのものと信じてURLを開き、フィッシングにより個人情報が漏えいする。",
      "正規メールをスパムと誤認して削除し、再スキャンで業務が遅延する。",
      "メールを盗聴した攻撃者が添付ファイルを暗号化し、身代金を要求する。",
      "メール本文のURLだけで、認証を回避して社内サーバへアクセスされる。"
    ], answer:0,
    reasoning:["初期設定が公開されていると、攻撃者は正規メールを容易に模倣できる。","本文URLのクリックを誘うフィッシングが成立し、認証情報などの漏えいにつながる。","正解はア。"],
    source:IPA_SOURCES.r05
  }),

  officialQuestion({
    id:"ipa-r06-q01", cat:"アルゴリズム", title:"三つの整数の最大値",
    prompt:"maximum(x,y,z) が異なる三整数の最大値を返すため、最初の if に入る条件はどれか。後続では y＞z なら y、そうでなければ z を返す。",
    choices:["x＞y","x＞y and x＞z","x＞y and y＞z","x＞z","x＞z and z＞y","z＞y"], answer:1,
    reasoning:["最初の分岐で x を返すには、x が y と z の両方より大きい必要がある。","条件は x＞y and x＞z。正解はイ。"],
    source:IPA_SOURCES.r06
  }),
  officialQuestion({
    id:"ipa-r06-q02", cat:"プログラミング", title:"2進文字列を10進数へ変換",
    prompt:"0と1だけから成る文字列 binary を左から走査し、符号なし2進数としての整数値を result に求める。ループ内の更新式はどれか。",
    code:["result ← 0","for (i を 1 から binaryの文字数 まで 1ずつ増やす)","  result ← ?","endfor","return result"],
    choices:["result＋int(binary[length-i+1])","result＋int(binary[i])","result×2＋int(binary[length-i+1])","result×2＋int(binary[i])"], answer:3,
    reasoning:["左から1ビット読むたび、既存値を2倍して新しいビットを加える。","更新式は result×2＋int(binary[i])。正解はエ。"],
    source:IPA_SOURCES.r06
  }),
  officialQuestion({
    id:"ipa-r06-q03", cat:"データ構造", title:"辺の配列から隣接行列へ",
    prompt:"無向グラフの辺 {u,v} を隣接行列に反映する処理はどれか。行列は辺がある成分を1とし、対称である。",
    choices:["adj[u,u]←1","adj[u,u]←1; adj[v,v]←1","adj[u,v]←1","adj[u,v]←1; adj[v,u]←1","adj[v,u]←1","adj[v,v]←1"], answer:3,
    reasoning:["辺 {u,v} は u から v と v から u の両成分に現れる。","無向グラフなので adj[u,v] と adj[v,u] をともに1にする。正解はエ。"],
    source:IPA_SOURCES.r06
  }),
  officialQuestion({
    id:"ipa-r06-q04", cat:"アルゴリズム", title:"マージ処理の残り要素",
    prompt:"昇順配列 {2,3} と {1,4} を merge する。主ループ終了後に data2 の残りを work へコピーする代入は何回実行されるか。",
    choices:["実行されない","1回","2回","3回"], answer:1,
    reasoning:["1をdata2から、2と3をdata1から取り込むと、data1が尽きる。","data2には4が一つ残るので、残り要素の代入は1回。正解はイ。"],
    source:IPA_SOURCES.r06
  }),
  officialQuestion({
    id:"ipa-r06-q05", cat:"プログラミング", title:"商品関連度の集計配列",
    prompt:"注文データから商品 item と他商品の関連度 L=(同時購入数×全注文数)÷(item購入数×他商品購入数) を求める。a、b、c の正しい組合せはどれか。",
    given:"a: itemとotherItems[i]の同時購入時に増やす配列\nb: otherItems[i]購入時に増やす配列\nc: 全注文数",
    choices:[
      "a=arrayK[i], b=arrayM[i], c=allItems数","a=arrayK[i], b=arrayM[i], c=orders数","a=arrayK[i], b=arrayM[i], c=otherItems数",
      "a=arrayM[i], b=arrayK[i], c=allItems数","a=arrayM[i], b=arrayK[i], c=orders数","a=arrayM[i], b=arrayK[i], c=otherItems数"
    ], answer:4,
    reasoning:["同時購入数は arrayM、他商品の購入数は arrayK に数える。","全注文数は orders の要素数。","a=arrayM[i], b=arrayK[i], c=ordersの要素数で、正解はオ。"],
    source:IPA_SOURCES.r06
  }),
  officialQuestion({
    id:"ipa-r06-q06", cat:"セキュリティ", title:"クラウド直結時の認証強化",
    prompt:"テレワーク端末からクラウドサービスへ社内ネットワークを介さず直接接続できるようにする。不正アクセスの増加リスクを低減する最も適切な対策はどれか。",
    choices:["社内ネットワークからの通信を監視する。","社内とクラウド間の通信速度を制限する。","社外から接続する際に2要素認証を導入する。","グループウェアだけを直接接続対象にする。","リモートデスクトップの保存禁止を無効にする。"], answer:2,
    reasoning:["直接接続では社内ネットワークからだけ許可する従来の制限が使えない。","社外接続の認証を2要素に強化するのが不正アクセスへ直接効く。正解はウ。"],
    source:IPA_SOURCES.r06
  }),

  officialQuestion({
    id:"ipa-r07-q01", cat:"アルゴリズム", title:"4の倍数を効率よく数える",
    prompt:"n以上m以下にある4の倍数の個数を数える function2 を、全整数を調べる function1 と同じ結果にする。最初の4の倍数を探すループ a と、その後のループ b の組合せはどれか。mはnより10以上大きい。",
    choices:[
      "a: iを1から2まで ／ b: jをnからtempNずつ増やす","a: iを1から2まで ／ b: jをtempNから1ずつ増やす","a: iを1から2まで ／ b: jをtempNから4ずつ増やす",
      "a: iを1から3まで ／ b: jをnからtempNずつ増やす","a: iを1から3まで ／ b: jをtempNから1ずつ増やす","a: iを1から3まで ／ b: jをtempNから4ずつ増やす"
    ], answer:5,
    reasoning:["どのnからでも最大3回加算すれば次の4の倍数に到達する。","最初の倍数 tempN からは4ずつ増やせば倍数だけを数えられる。","正解はカ。"],
    source:IPA_SOURCES.r07
  }),
  officialQuestion({
    id:"ipa-r07-q02", cat:"アルゴリズム", title:"硬貨で金額を作る組合せ",
    prompt:"1円玉、5円玉、10円玉を使ってちょうどn円にする組合せを数える。10円玉を0枚から増やし、残額 rest に対する5円玉の使い方を加算する while の条件はどれか。",
    code:["count ← 0","rest ← n","while (?)","  count ← count ＋ (rest÷5の商) ＋ 1","  rest ← rest－10","endwhile"],
    choices:["rest≧0","rest≧5","rest≧10","rest＞0","rest＞5","rest＞10"], answer:0,
    reasoning:["rest=0でも、1円玉・5円玉を0枚使う1通りを数える必要がある。","負になったら終了するため条件は rest≧0。正解はア。"],
    source:IPA_SOURCES.r07
  }),
  officialQuestion({
    id:"ipa-r07-q03", cat:"データ構造", title:"配列で表すスタック",
    prompt:"stackPos が次に格納する位置を示す配列スタックで、push の格納添字 a と、pop で取り出す前の stackPos 更新式 b はどれか。",
    choices:["a=stackPos, b=stackPos＋1","a=stackPos, b=stackPos－1","a=stackPos－1, b=stackPos＋1","a=stackPos－1, b=stackPos－1"], answer:1,
    reasoning:["push は次の空き位置 stackPos に格納してから1増やす。","pop は stackPos を1減らして直前の格納位置を指してから取り出す。正解はイ。"],
    source:IPA_SOURCES.r07
  }),
  officialQuestion({
    id:"ipa-r07-q04", cat:"アルゴリズム", title:"部分文字列探索の比較回数",
    prompt:"data={a,b,a,b,c,a,b,c} から key={a,b,c} を探す。内側ループの比較 data[i+j-1]=key[j] が真になる回数は何回か。",
    choices:["1","2","3","4","5","6","7","8","9","10"], answer:7,
    reasoning:["開始位置i=1では2回真、i=2は0回、i=3は3回真。","i=4は0回、i=5は0回、i=6は3回真。","合計2＋3＋3=8回で、正解はク。"],
    source:IPA_SOURCES.r07
  }),
  officialQuestion({
    id:"ipa-r07-q05", cat:"プログラミング", title:"分割表の理論度数",
    prompt:"観測度数 {{82,6},{58,8}} について、独立を仮定した理論度数を (行合計×列合計)÷総数 で求める。表中 a（接種あり・罹患なし）と b（接種なし・罹患あり）はどれか。",
    choices:["44,33","58,8","70,7","75,2","80,6","80,8","82,6"], answer:4,
    reasoning:["総数154、罹患なし列は140、罹患あり列は14。接種あり行は88、なし行は66。","a=88×140÷154=80、b=66×14÷154=6。80,6で正解はオ。"],
    source:IPA_SOURCES.r07
  }),
  officialQuestion({
    id:"ipa-r07-q06", cat:"セキュリティ", title:"バックアップのRPOとRTO",
    prompt:"土曜2時にフル、火曜・木曜2時に増分バックアップを取得する。RPOは72時間、フルの復元は4時間、増分1回は0.25時間。金曜正午障害時の最低復元時点a1、木曜正午障害時の復元時間a2、ICT継続計画の承認者a3の組合せはどれか。",
    choices:["月曜正午,4.25,CISO","月曜正午,4.25,担当者","月曜正午,4.25,内部監査室長","月曜正午,4.50,CISO","月曜正午,4.50,担当者","火曜正午,4.25,担当者","火曜正午,4.25,内部監査室長","火曜正午,4.50,CISO","火曜正午,4.50,担当者","火曜正午,4.50,内部監査室長"], answer:7,
    reasoning:["金曜正午から72時間前は火曜正午なので、それ以後の時点を復元する必要がある。","木曜正午ならフル＋火曜増分＋木曜増分で4.50時間。計画はCISOが承認する。","正解はク。"],
    source:IPA_SOURCES.r07
  }),

  officialQuestion({
    id:"ipa-r08-q01", cat:"アルゴリズム", title:"配列末尾を先頭へ移動",
    prompt:"data={1,2,3,4,5,6,7,8,9} の末尾を先頭へ移し、他要素を一つ後ろへずらす。data[i]←data[i-1] を実行するループ範囲はどれか。",
    choices:["2からlen-1まで増やす","2からlenまで増やす","len-1から2まで減らす","lenから2まで減らす"], answer:3,
    reasoning:["前から代入すると元の値を上書きしてしまうため、末尾側から処理する。","i=lenから2まで1ずつ減らす。正解はエ。"],
    source:IPA_SOURCES.r08
  }),
  officialQuestion({
    id:"ipa-r08-q02", cat:"プログラミング", title:"8ビット値の2の補数",
    prompt:"8ビット値xに加えると00000000になる値を、yを求めてから1加算して返す。yに入れる式はどれか。桁あふれは無視する。",
    choices:["x AND 01111111","x AND 11111111","x OR 01111111","x OR 11111111","x XOR 01111111","x XOR 11111111"], answer:5,
    reasoning:["2の補数は全ビット反転して1を加える。","8ビットの全1とのXORで全ビットを反転できる。正解はカ。"],
    source:IPA_SOURCES.r08
  }),
  officialQuestion({
    id:"ipa-r08-q03", cat:"アルゴリズム", title:"再帰式の反復計算",
    prompt:"func1(n)=1 (n≦2)、それ以外は2×func1(n-2)+func1(n-1)。直前2値を data={1,1,1} で保持する反復版で、シフト後の data[3] に入れる式はどれか。",
    choices:["2×data[1]＋data[2]","2×data[2]＋data[1]","2×data[i-1]＋data[i-2]","2×data[i-2]＋data[i-1]","data[3]＋2×data[1]＋data[2]","data[3]＋2×data[2]＋data[1]","data[3]＋2×data[i-1]＋data[i-2]","data[3]＋2×data[i-2]＋data[i-1]"], answer:0,
    reasoning:["代入後は data[1] が f(i-2)、data[2] が f(i-1) を保持する。","再帰式どおり 2×data[1]＋data[2]。正解はア。"],
    source:IPA_SOURCES.r08
  }),
  officialQuestion({
    id:"ipa-r08-q04", cat:"データ構造", title:"配列で表す単方向リストの走査",
    prompt:"dataList と pointerList で単方向リストを表す。現在位置pの値を追加した後、末尾判定に使う a と、次位置へ進める b の組合せはどれか。",
    choices:["a=dataList[p], b=i","a=dataList[p], b=pointerList[p]","a=pointerList[p], b=i","a=pointerList[p], b=pointerList[p]"], answer:3,
    reasoning:["末尾は次ポインタ pointerList[p] が未定義かで判定する。","次の位置も pointerList[p] をpへ代入する。正解はエ。"],
    source:IPA_SOURCES.r08
  }),
  officialQuestion({
    id:"ipa-r08-q05", cat:"プログラミング", title:"One-Hot表現への変換",
    prompt:"色名配列から初出順の名前一覧 colorVector を作り、各色をOne-Hot表現へ変換する。a と b の正しい組合せはどれか。",
    choices:["a=colors[i], b=colorsのどれかがcolorVector[k]","a=colors[i], b=colors[j]=colorVector[k]","a=未定義, b=colorsのどれかがcolorVector[k]","a=未定義, b=colors[j]=colorVector[k]"], answer:1,
    reasoning:["名前一覧には初出の colors[i] を追加する。","変換時は現在の色 colors[j] と名前一覧 colorVector[k] を比較する。正解はイ。"],
    source:IPA_SOURCES.r08
  }),
  officialQuestion({
    id:"ipa-r08-q06", cat:"セキュリティ", title:"クラウドログ管理ルール",
    prompt:"クラウドのログ管理ルール3は、運用担当者だけがログへアクセスし、エクスポート時は自部署サーバで担当者だけがアクセス可能、担当者は複数、ログインは2要素認証、と定める。違反する運用はどれか。\n(一)容量不足時に古いログを上書き (二)担当者が1名 (三)日時がUTC (四)全ログを一般従業員も編集できる部署サーバへ保管",
    choices:["一,二","一,二,三","一,二,四","一,三","一,三,四","一,四","二,三","二,三,四","二,四","三,四"], answer:8,
    reasoning:["(二)は担当者を複数名にする規定への違反。","(四)は担当者以外もアクセスできるサーバへの保管で違反。(一)は保存期間・改ざん対策、(三)は日時項目の規定に関係する。","ルール3への違反は(二),(四)で、正解はケ。"],
    source:IPA_SOURCES.r08
  })
];

QUESTIONS.push(...OFFICIAL_QUESTIONS);
